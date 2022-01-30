from flask import Flask
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import torch
from torch import nn
import torch.nn.functional as F
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
import gluonnlp as nlp
import numpy as np
from tqdm import tqdm, tqdm_notebook
from collections import Counter
from kobert.utils import get_tokenizer
from kobert.pytorch_kobert import get_pytorch_kobert_model
from transformers import AdamW
from transformers.optimization import get_cosine_schedule_with_warmup
import re


import config
from env import secret_key

db = SQLAlchemy()
migrate = Migrate()


device = torch.device("cpu")
bertmodel, vocab = get_pytorch_kobert_model()


class BERTDataset(Dataset):  # 토큰화 & 패딩 과정, 입력된 일기 데이터를 Bert모델에 넣을 수 있는 데이터로 변환
    max_len = 64
    batch_size = 64

    def __init__(
        self, dataset, sent_idx, label_idx, bert_tokenizer, max_len, pad, pair
    ):
        transform = nlp.data.BERTSentenceTransform(
            bert_tokenizer, max_seq_length=max_len, pad=pad, pair=pair
        )

        self.sentences = [transform([i[sent_idx]]) for i in dataset]
        self.labels = [np.int32(i[label_idx]) for i in dataset]

    def __getitem__(self, i):
        return self.sentences[i] + (self.labels[i],)

    def __len__(self):
        return len(self.labels)


class BERTClassifier(nn.Module):  # 모델을 가져오고 읽어주는 class
    def __init__(self, bert, hidden_size=768, num_classes=2, dr_rate=None, params=None):
        super(BERTClassifier, self).__init__()
        self.bert = bert
        self.dr_rate = dr_rate

        self.classifier = nn.Linear(hidden_size, num_classes)
        if dr_rate:
            self.dropout = nn.Dropout(p=dr_rate)

    def gen_attention_mask(self, token_ids, valid_length):
        attention_mask = torch.zeros_like(token_ids)
        for i, v in enumerate(valid_length):
            attention_mask[i][:v] = 1
        return attention_mask.float()

    def forward(self, token_ids, valid_length, segment_ids):
        attention_mask = self.gen_attention_mask(token_ids, valid_length)

        _, pooler = self.bert(
            input_ids=token_ids,
            token_type_ids=segment_ids.long(),
            attention_mask=attention_mask.float().to(token_ids.device),
        )
        if self.dr_rate:
            out = self.dropout(pooler)
        return self.classifier(out)


def emotion_analysis(total_text):  # 감정분석 함수
    max_len = 64
    batch_size = 64

    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    emotions = list()
    data = [total_text, "0"]
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(
        another_test, batch_size=batch_size, num_workers=0
    )
    # print(test_dataloader)
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length
        label = label.long().to(device)
        out = emotion_model(token_ids, valid_length, segment_ids)

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            emotions = []
            if np.argmax(logits) == 0:
                emotions = "fear"
            elif np.argmax(logits) == 1:
                emotions = "surprise"
            elif np.argmax(logits) == 2:
                emotions = "anger"
            elif np.argmax(logits) == 3:
                emotions = "sadness"
            elif np.argmax(logits) == 4:
                emotions = "neutrality"
            elif np.argmax(logits) == 5:
                emotions = "happiness"
            elif np.argmax(logits) == 6:
                emotions = "disgust"

            return emotions


def slang_analysis(total_text):  # 폭언&욕설분석 함수
    max_len = 64
    batch_size = 64

    tokenizer = get_tokenizer()
    tok = nlp.data.BERTSPTokenizer(tokenizer, vocab, lower=False)

    data = [total_text, "0"]
    dataset_another = [data]
    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(
        another_test, batch_size=batch_size, num_workers=0
    )

    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(
        test_dataloader
    ):
        token_ids = token_ids.long().to(device)
        segment_ids = segment_ids.long().to(device)
        valid_length = valid_length
        label = label.long().to(device)
        out = slang_model(token_ids, valid_length, segment_ids)

        for i in out:
            logits = i
            logits = logits.detach().cpu().numpy()
            if np.argmax(logits) == 0:  # 일반
                result = False
                break
            elif np.argmax(logits) == 1:  # 비방&욕설
                result = True
        return result


def pre_process(raw_text):  # 정규표현식 & split 함수
    regex = re.compile("[^ .가-힣+]")
    result = regex.sub("", raw_text)
    devided_sentence = result.split(". ")  # 마침표 + 띄어쓰기 기준

    return list(devided_sentence)


def analysis_result(total_text):  # 집합함수

    slang = slang_analysis(total_text)  # 폭언욕설분석

    emo_list = []
    pre_text = pre_process(total_text)  # 전처리
    for i in range(len(pre_text)):
        if pre_text[i] != "":
            emo_list.append(emotion_analysis(pre_text[i]))  # 감정분석
        else:
            pass
    max_item = Counter(emo_list).most_common(n=1)
    return max_item[0][0], slang


emotion_model = torch.load(
    "ai_models/emotion_model.pt", map_location=torch.device("cpu")
)
slang_model = torch.load("ai_models/slang_model.pt", map_location=torch.device("cpu"))

def create_app():
    app = Flask(__name__)
    app.secret_key = secret_key

    app.config.from_object(config)
    db.init_app(app)
    migrate.init_app(app, db)
    from models.user import User
    from models.article import Article
    from models.sympathy import Sympathy

    from blueprints.article import my_article
    from blueprints.user import user
    from blueprints.main import main
    from blueprints.board import board
    from blueprints.auth.signup import signup
    from blueprints.auth.login import login
    from blueprints.auth.logout import logout
    from blueprints.open_board import open_board

    app.register_blueprint(my_article)
    app.register_blueprint(user)
    app.register_blueprint(main)
    app.register_blueprint(board)
    app.register_blueprint(signup)
    app.register_blueprint(login)
    app.register_blueprint(logout)
    app.register_blueprint(open_board)

    CORS(app, supports_credentials=True)
    return app


if __name__ == "__main__":
    create_app().run(debug=True)

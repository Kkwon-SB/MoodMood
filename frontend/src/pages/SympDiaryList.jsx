import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BasicLayout from "../layouts/BasicLayout";
import DiaryListDropdown, {
    UnicodeEmoMap,
} from "../components/DiaryListDropdown";

const mockups = [
    {
        date: "2021-12-10",
        text: "불금이다. 하루일과를 마치고 여자친구와 집에서 저녁을 시켜먹었다. 오늘의 메뉴는 곱창이었는데 자주 시켜먹는 집이라서 역시 맛있었다. 그리고 여자친구가 사온 맥주를 같이 마시면서 밀린 유튜브랑 넷플 ···",
        emotion: "\u{1F603}",
        article_id: true,
        symped: true,
        num: 42,
    },
    {
        date: "2021-12-9",
        text: "오늘 내가 좋아하는 친구를 만났다. 이 친구를 좋아하는 이유는 말이 잘 통하고 재밌어서도 있지만 솔직히 닮고싶은 친구라서 그런것같다. 꿈이란 게 있고 그 꿈을 좇아서 살아가는것이 너무 부러웠다. 난 평···",
        emotion: "\u{1F603}",
        article_id: true,
        symped: true,
        num: 79,
    },
    {
        date: "2021-12-8",
        text: "맨날 보는 사람들 정들법도한데 왜 이사람들은 매일매일 나를 화나게하는걸까? 내가 일을 못해서 그런거겠지...? 라고 생각해본다. 앞으로는 더 잘 해보려고 노력해야지.!",
        emotion: "\u{1F620}",
        article_id: false,
        num: 10,
    },
    {
        date: "2021-12-8",
        text: "길도잃고, 돈도잃어버리고, 사진첩에는 셀카만가득한 혼자여행을 다녀왔다. 모든게 처음이라 어딜가나 가방을 꼭 쥐고다녔다. 처음엔 혼자라서 심심하고 무서웠지만, 점점 시간이 지날수록 혼자서하는 여···",
        emotion: "\u{1F61E}",
        article_id: false,
        symped: true,
        num: 88,
    },
    {
        date: "2021-11-19",
        text: "오늘은 점심부터 마라탕이 먹고싶다. 겁나게 매운맛으로. 근데 아직 월급을 받지못했으니깐 돈을아껴야지 나는 거지니깐 흑흑",
        emotion: "\u{1F605}",
        article_id: false,
        num: 12,
    },
];

const Heart = ({ sym }) => {
    const [symped, setSymped] = useState(sym ?? false);
    return (
        <IconButton
            onClick={() => {
                setSymped(!symped);
            }}
        >
            {symped ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
    );
};

const SympDiaryList = () => {
    const [diaries, setDiaries] = useState([...mockups].reverse());
    const [fromOld, setFromOld] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        // 여기서 받아와서 diaries 에 set해주세요.
    }, []);

    useEffect(() => {
        if (fromOld) {
            setDiaries(mockups);
        } else {
            setDiaries([...mockups].reverse());
        }
    }, [fromOld]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    {/* 다이어리 감정 드롭다운  */}
                    <DiaryListDropdown
                        emotionFilter={emotionFilter}
                        setEmotionFilter={setEmotionFilter}
                    />
                    {/* 체크박스 오래된 거부터 */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={fromOld}
                                onChange={() => {
                                    setFromOld(!fromOld);
                                }}
                            />
                        }
                        label="오래된것부터보기"
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sx={{ maxHeight: 630, overflow: "scroll" }}>
                {diaries.map((diary) => {
                    if (
                        emotionFilter !== "all" &&
                        UnicodeEmoMap[emotionFilter] !== diary.emotion
                    ) {
                        // eslint-disable-next-line array-callback-return
                        return;
                    }
                    return (
                        <Paper
                            key={diary.date}
                            sx={{
                                m: 2,
                                minHeight: 100,
                                p: 2,
                                position: "relative",
                            }}
                        >
                            <Typography variant="h6">
                                {diary.date} {diary.emotion}
                            </Typography>
                            <Typography variant="body1"
                                sx={{
                                    mr: 5,
                                }}>
                                {diary.text}
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    p: 3,
                                }}
                            >
                                <Heart sym={diary.symped} />
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default SympDiaryList;

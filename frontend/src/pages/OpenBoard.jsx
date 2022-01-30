import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BasicLayout from "../layouts/BasicLayout";
import { readBoard } from "../apis/board";
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

const NumHeart = ({ symped, num }) => {
    return (
        <IconButton>
            <Badge color="secondary" badgeContent={num}>
                {symped ? (
                    <FavoriteBorderIcon
                        sx={{ fontSize: 70 }}
                        color="secondary"
                    />
                ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 70 }} />
                )}
            </Badge>
        </IconButton>
    );
};

const OpenBoard = () => {
    const [diaries, setDiaries] = useState([]);
    const [immuDiaries, setImmuDiaries] = useState([...mockups].reverse());
    const [fromOld, setFromOld] = useState(false);
    const [sympOrder, setSympOrder] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");
    useEffect(() => {
        console.log("글 받아오기");
        const fetchData = async () => {
            try {
                const data = await readBoard();
                console.log(data);
                // setDiaries(data);
                // setDiaries(data); 오류가 나서 임시로 막아뒀습니다 서버 연결 후 풀어봐야할듯..?
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        if (sympOrder) {
            // if (fromOld) {
            //     setDiaries(mockups.filter((diary) => diary));
            // } else {
            //     setDiaries(mockups.filter((diary) => diary).reverse());
            // }
        } else {
            if (fromOld) {
                setDiaries(immuDiaries);
            } else {
                setDiaries([...immuDiaries].reverse());
            }
        }
    }, [sympOrder, fromOld, immuDiaries]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    <DiaryListDropdown
                        emotionFilter={emotionFilter}
                        setEmotionFilter={setEmotionFilter}
                    />

                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                value={fromOld}
                                onChange={() => {
                                    setFromOld(!fromOld);
                                }}
                            />
                        }
                        label="오래된것부터보기"
                    /> */}
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={sympOrder}
                                onChange={() => {
                                    setSympOrder(!sympOrder);
                                }}
                            />
                        }
                        label="공감 많은순"
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
                                backgroundColor: "secondary.dark",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <NumHeart
                                symped={diary.symped}
                                num={diary.num ?? 0}
                                >
                            </NumHeart>
                            <Typography variant="body1"
                                sx={{
                                    mr: 16,
                                    ml: 3,
                                }}>
                                {diary.text}
                            </Typography>
                            <Box
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    top: 0,
                                    p: 3,
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography variant="h6">
                                    {diary.date}
                                </Typography>

                                <Typography
                                    sx={{ textAlign: "right" }}
                                    variant="h4"
                                >
                                    {diary.emotion}
                                </Typography>
                            </Box>
                        </Paper>
                    );
                })}
            </Grid>
        </BasicLayout>
    );
};

export default OpenBoard;
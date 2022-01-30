import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import BasicLayout from "../layouts/BasicLayout";
import ReadonlyEditor from "../components/ReadonlyEditor";
import DiaryListDropdown, {
    UnicodeEmoMap,
} from "../components/DiaryListDropdown";
import { readArticles } from "../apis/article";
import { dateAtom } from "../recoils/diary";
import { useNavigate } from "react-router";

const DiaryItem = ({ diary }) => {
    const [date, setDate] = useRecoilState(dateAtom);
    const navi = useNavigate();
    const handleClick = () => {
        setDate(new Date(diary.date));
        navi("/diary/done");
    };

    return (
        <Paper
            key={diary.date}
            sx={{
                m: 2,
                minHeight: 100,
                height: 140,
                overflow: "hidden",
                p: 2,
                position: "relative",
                ":hover": {
                    boxShadow: 6,
                    cursor: "pointer",
                },
            }}
            onClick={() => {
                handleClick();
            }}
        >
            <Typography variant="h6">
                {diary.date} {UnicodeEmoMap[diary.emotion]}
            </Typography>
            <ReadonlyEditor content={diary.text} id={diary.date} />
            <Box
                sx={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                    p: 3,
                }}
            >
                {diary.is_shared ? <LockOpenIcon /> : <LockIcon />}
            </Box>
        </Paper>
    );
};

const DiaryList = () => {
    const [diaries, setDiaries] = useState([]);
    const [immudiaries, setImmudiaries] = useState([]);
    const [fromOld, setFromOld] = useState(false);
    const [isPublic, setIsPublic] = useState(false);
    const [emotionFilter, setEmotionFilter] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("글 받아오기");
                const articles = await readArticles();

                if (!articles) {
                    alert("잘못된 응답!");
                    return;
                }
                setImmudiaries(articles);
                setDiaries(articles);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (isPublic) {
            if (fromOld) {
                setDiaries(
                    immudiaries.filter((diary) => diary.is_shared).reverse()
                );
            } else {
                setDiaries(immudiaries.filter((diary) => diary.is_shared));
            }
        } else {
            if (fromOld) {
                setDiaries([...immudiaries].reverse());
            } else {
                setDiaries(immudiaries);
            }
        }
    }, [isPublic, fromOld, immudiaries]);

    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Box>
                    <DiaryListDropdown
                        emotionFilter={emotionFilter}
                        setEmotionFilter={setEmotionFilter}
                    />

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
                    <FormControlLabel
                        control={
                            <Checkbox
                                value={isPublic}
                                onChange={() => {
                                    setIsPublic(!isPublic);
                                }}
                            />
                        }
                        label="공개된 글"
                    />
                </Box>
            </Grid>
            {/* 이게 실제 아이템들 */}
            <Grid item xs={12} sx={{ maxHeight: 630, overflow: "scroll" }}>
                {diaries.map((diary) => {
                    if (
                        emotionFilter !== "all" &&
                        UnicodeEmoMap[emotionFilter] !== diary.emotion
                    ) {
                        console.log(diary);
                        console.log(UnicodeEmoMap);
                        console.log(UnicodeEmoMap[emotionFilter]);
                        console.log(diary.emotion);
                        return <div key={diary.date}></div>;
                    }
                    return <DiaryItem key={diary.date} diary={diary} />;
                })}
            </Grid>
        </BasicLayout>
    );
};

export default DiaryList;

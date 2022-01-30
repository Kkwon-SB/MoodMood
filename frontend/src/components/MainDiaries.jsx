import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { dateAtom } from "../recoils/diary";
import ReadonlyEditor from "./ReadonlyEditor";

const MainDiaries = () => {
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);
    const [fullDate, setFullDate] = useState("");
    const [fullDateString, setFullDateString] = useState("");
    const [contentData, setContentData] = useState("");

    useEffect(() => {
        // date 가 바뀌면
        const yearStr = date.getFullYear();
        const monthNum = date.getMonth() + 1;
        const dateNum = date.getDate();
        const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
        const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
        const numDate = `${yearStr}-${monthStr}-${dateStr}`;
        const strDate = `${yearStr}년 ${monthNum}월 ${dateNum}일`;
        setFullDateString(strDate); // 2020년 ~ 월 ~ 일
        setFullDate(numDate); // 2020-11-11
    }, [date]);

    useEffect(() => {
        
        // keep localStorage
        const next = localStorage.getItem(fullDate);
        next && next !== contentData
            ? setContentData("loading")
            : setContentData("");
        const id = setTimeout(() => {
            setContentData(next);
        }, 10);
        return () => {
            clearTimeout(id);
        };
    }, [fullDate]);

    // useEffect(() => {}, [contentData]);

    const goWriteDiary = () => {
        navi("/diary/write");
    };
    return (
        <>
            <Typography variant="h5">{fullDateString}</Typography>
            {contentData === "loading" ? (
                <Box sx={{ height: 200 }}></Box>
            ) : contentData ? (
                <>
                    <ReadonlyEditor content={contentData} id={fullDate} />
                </>
            ) : (
                <>
                    <Typography sx={{ mt: 3, mb: 3, fontSize: 17 }}>
                        일기가 없어요ㅠㅠ
                    </Typography>
                    <Button onClick={() => goWriteDiary()} variant="contained">
                        <Typography>{">>"} 일기 쓰러 가기</Typography>
                    </Button>
                </>
            )}
        </>
    );
};

export default MainDiaries;


// sx={{
//                             backgroundColor: "#eeeeee",
//                         }}
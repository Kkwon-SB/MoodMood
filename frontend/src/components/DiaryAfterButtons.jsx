/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
    dateAtom,
    isUpdateNow,
    isAnony as isatom,
    emotion as emoatom,
    isSharable,
} from "../recoils/diary";
import { deleteArticle, updateIsShared } from "../apis/article";

const DiaryAfterButtons = () => {
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [isErrorModalOpened, setIsErrorModalOpened] = useState(false);
    const [wasYes, setWasYes] = useState(false);

    const editorValue = usePlateValue();
    const navi = useNavigate();

    const [date, setDate] = useRecoilState(dateAtom);
    const [isUpdate, setIsUpdate] = useRecoilState(isUpdateNow);
    const [withAnony, setWithAnony] = useRecoilState(isatom);
    const [emotion, setEmotion] = useRecoilState(emoatom);
    const [sharability, setSharability] = useRecoilState(isSharable);

    const yearStr = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
    const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
    const numDate = `${yearStr}-${monthStr}-${dateStr}`;
    const otherNumDate = `${yearStr}${monthStr}${dateStr}`;

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const share = () => {
        console.log("open modal!");
        setIsModalOpened(true);
    };

    const doShare = async () => {
        // 만약 셰어가 불가능한데 셰어를 시도할 경우
        if (!sharability && !withAnony) {
            console.log("공유 불가능!");
            setIsErrorModalOpened(true);
            return;
        }

        try {
            // 공유하기 시도하기
            await updateIsShared(otherNumDate, !withAnony ? 1 : 0);
        } catch (e) {
            console.log(e);
        }
    };

    const revise = async () => {
        console.log(`글쓰기 수정: ${isUpdate}`);
        setIsUpdate(true);
        navi("/diary/write");
    };

    const deleteDiary = async () => {
        console.log(`삭제: ${otherNumDate}`);
        try {
            deleteArticle(otherNumDate);
        } catch (e) {
            console.log(e);
        }
        navi("/");
    };

    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" onClick={share} sx={{ mr: 1 }}>
                    공유
                </Button>
                <Button variant="contained" onClick={revise} sx={{ mr: 1 }}>
                    수정
                </Button>
                <Button variant="contained" onClick={deleteDiary}>
                    삭제
                </Button>
            </Box>

            <Modal
                open={isErrorModalOpened}
                onClose={() => isErrorModalOpened(false)}
            >
                <Paper
                    sx={{
                        outline: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: 400,
                    }}
                >
                    <Typography sx={{ mb: 4 }} variant="h5">
                        현재 입력하신 글에 욕설이나 비방이 포함되어 있어 공개가
                        불가능합니다!
                    </Typography>
                </Paper>
            </Modal>
            <Modal
                open={isModalOpened}
                onClose={() => {
                    setIsModalOpened(false);
                }}
            >
                <Paper
                    sx={{
                        outline: "none",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-around",
                        alignItems: "center",
                        maxWidth: 400,
                    }}
                >
                    {wasYes ? (
                        <>
                            <Typography sx={{ mb: 4 }} variant="h5">
                                공개된 글 보러가기!
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    minWidth: 150,
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        navi("/diary");
                                    }}
                                    variant="contained"
                                >
                                    좋아
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsModalOpened(false);
                                        setWasYes(false);
                                    }}
                                >
                                    다음에
                                </Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ mb: 4 }} variant="h5">
                                공유하시겠습니까?
                            </Typography>
                            {/* <Checkbox
                                checked={withAnony}
                                onChange={() => setWithAnony(!withAnony)}
                            />
                            <Typography sx={{ mb: 4 }} variant="h6">
                                익명으로 공유하기
                            </Typography> */}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    minWidth: 150,
                                }}
                            >
                                <Button
                                    onClick={async () => {
                                        setWasYes(true);
                                        await doShare();
                                    }}
                                    variant="contained"
                                >
                                    좋아
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsModalOpened(false);
                                    }}
                                >
                                    다음에
                                </Button>
                            </Box>
                        </>
                    )}
                </Paper>
            </Modal>
        </>
    );
};

export default DiaryAfterButtons;

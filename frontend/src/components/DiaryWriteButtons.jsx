/* eslint-disable no-unused-vars */
import React from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { usePlateValue } from "@udecode/plate-core";
import Button from "@mui/material/Button";
import { dateAtom, isUpdateNow } from "../recoils/diary";
import { createArticle, readArticle, updateArticle } from "../apis/article";
import { UnicodeEmoMap } from "./DiaryListDropdown";

const DiaryWriteButtons = () => {
    const editorValue = usePlateValue();
    const navi = useNavigate();
    const [date, setDate] = useRecoilState(dateAtom);
    const [isUpdating, setIsUpdating] = useRecoilState(isUpdateNow);

    const cancel = () => {
        console.log("글쓰기 취소");
        navi("/");
    };

    const submit = async () => {
        console.log("글쓰기 저장");

        // 에디터 내용 긁어오기
        const contentString = JSON.stringify(editorValue);

        // 날짜정보 불러오기
        const yearStr = date.getFullYear();
        const monthNum = date.getMonth() + 1;
        const dateNum = date.getDate();
        const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
        const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
        const numDate = `${yearStr}-${monthStr}-${dateStr}`; // 로컬스토리지용
        const otherNumDate = `${yearStr}${monthStr}${dateStr}`; // 백엔드요청부용

        // 글쓰다 만 거 불러오기 할 때 쓰려고 할 때 위함
        localStorage.setItem(numDate, contentString);

        try {
            // 일단 무지성으로 글을 씀
            const response = await createArticle({
                text: contentString,
                date: Number(otherNumDate),
            });
            if (!response || response.status !== 200) {
                alert("글 작성 및 업데이트가 정상적으로 처리되지 않음!");
                return;
            }

            // 글이 있으면 새로 쓰는게 아니라 업데이트를 콜해야함
            if (response.data.result !== "success") {
                setIsUpdating(true);
            } else {
                setIsUpdating(false);
            }

            // 업데이팅 중이면
            if (isUpdating) {
                // 업데이트 받아오기
                const response = await updateArticle(
                    otherNumDate,
                    contentString
                );
                if (!response || response.status !== 200) {
                    alert("글 업데이트가 정상적으로 처리되지 않음!");
                    return;
                }
            }
            console.log("글 작성 및 업데이트 됨.");

            // 작업이 끝났으므로 일단은 상세페이지로
            navi("/diary/done");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Button variant="contained" onClick={cancel}>
                취소
            </Button>
            <Button variant="contained" onClick={submit}>
                저장
            </Button>
        </>
    );
};

export default DiaryWriteButtons;

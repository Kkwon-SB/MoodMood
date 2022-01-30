/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { nickname as nkatom, password as pwatom } from "../recoils/userInfo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { updateUser } from "../apis/user";

const MyInfoButtons = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [pw, setPw] = useRecoilState(pwatom);
    const navi = useNavigate();
    const revise = async () => {
        try {
            const res = await updateUser({
                nickname: nickname,
                password: pw,
                password_check: pw,
            });
        } catch (e) {
            console.log(e);
            alert("회원정보 수정 안됨!");
        }
    };
    const toHome = () => {
        console.log("홈으로");
        navi("/");
    };
    return (
        <>
            <Button
                sx={{ mr: 1 }}
                onClick={() => toHome()}
                variant="contained"
                color="secondary"
            >
                <Typography>홈으로</Typography>
            </Button>

            <Button
                onClick={() => revise()}
                variant="contained"
                color="secondary"
            >
                <Typography>수정하기</Typography>
            </Button>
        </>
    );
};

export default MyInfoButtons;

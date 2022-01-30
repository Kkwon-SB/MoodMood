import React from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const MyInfoButtons = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navi = useNavigate();
    const logout = () => {
        // 로그아웃 없는데요?ㅠㅠ
        console.log("로그아웃되었습니다.");
        navi("/signin");
    };

    const toMyInfo = () => {
        console.log("내정보로");
        navi("/me");
    };

    return (
        <>
            <Button
                sx={{ mr: 1 }}
                onClick={() => toMyInfo()}
                variant="contained"
                color="secondary"
            >
                <Typography>내 정보</Typography>
            </Button>

            <Button
                onClick={() => logout()}
                variant="contained"
                color="secondary"
            >
                <Typography>로그아웃</Typography>
            </Button>
        </>
    );
};

export default MyInfoButtons;

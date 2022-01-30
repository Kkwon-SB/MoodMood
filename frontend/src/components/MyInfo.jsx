import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
    photo as ptatom,
    nickname as nkatom,
    password as pwatom,
    passwordRetry as pwReatom,
} from "../recoils/userInfo";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { readUser } from "../apis/user";
import MyInfoImageButtons from "./MyInfoImageButtons";

const MyInfo = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [pw, setPw] = useRecoilState(pwatom);
    const [pwRt, setPwRt] = useRecoilState(pwReatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const [email, setEmail] = useState("immutable@email.com");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userinfo = await readUser();
                if (userinfo.nickname) {
                    setNickname(userinfo.nickname);
                }
                // setPhoto(userinfo.photo); 포토는 안받아도 똑같을 것
                if (userinfo.email) {
                    setEmail(userinfo.email);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <Box
            sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                mb: 4,
            }}
        >
            <Avatar
                variant="rounded"
                alt="avatar profile"
                src={photo}
                sx={{
                    width: "10vw",
                    height: "10vw",
                    bgcolor: "#b2cefe",
                    mb: 2,
                }}
            />
            <MyInfoImageButtons />
            <TextField
                sx={{ m: 2 }}
                label="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                variant="filled"
            />
            <TextField
                sx={{ m: 2 }}
                label="이메일"
                disabled
                value={email}
                variant="filled"
            />
            <TextField
                type="password"
                sx={{ m: 2 }}
                label="비밀번호"
                variant="filled"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
            />
            <TextField
                type="password"
                sx={{ m: 2 }}
                label="비밀번호 확인"
                variant="filled"
                value={pwRt}
                onChange={(e) => setPwRt(e.target.value)}
            />
        </Box>
    );
};

export default MyInfo;

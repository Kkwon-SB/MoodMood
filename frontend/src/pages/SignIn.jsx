import React from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../components/Logo";
import signin from "../apis/signin";

import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";

const SignIn = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        // submit default event 로 인한 화면 refresh 막음
        event.preventDefault();

        // formdata 에서 데이터 추출
        const data = new FormData(event.currentTarget);
        const jsonData = {
            email: data.get("email"),
            password: data.get("password"),
        };

        // json data 요청 전에 확인
        console.log(jsonData);

        try {
            // 로그인 요청보내기
            const userInfo = await signin(jsonData);

            // 요청에 대한 응답
            console.log(userInfo);

            //데이터 객체 자체가 오지 않았을 경우
            if (!userInfo) {
                alert("잘못된 응답!");
                return;
            }
            const p = userInfo.photo;
            const n = userInfo.nickname;

            // status 코드가 200으로 일괄 세팅되기 때문에 응답으로 오는 데이터를 판단
            if (p && n) {
                // 포토 부분과 닉네임 넣어주기
                const p = userInfo.photo;
                const n = userInfo.nickname;

                // recoil 전체 state 업데이트
                setPhoto(p);
                setNickname(n);

                //0.5 초 후에 navigate
                const id = setTimeout(() => {
                    navigate("/");
                }, 500);
                return () => {
                    // clean up code
                    clearTimeout(id);
                };
            } else {
                alert(userInfo.result);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Container
            sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1633474601643-a321174fd8fd)",
                    backgroundSize: "cover",
                    opacity: 0.6,
                }}
            ></Box>
            <Paper
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 4,
                    maxWidth: 400,
                    zIndex: 2,
                }}
                elevation={3}
            >
                <Logo />
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="이메일"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="비밀번호"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        로그인
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/">
                                <Typography variant="body2">
                                    비밀번호를 잊으셨나요?
                                </Typography>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                <Typography variant="body2">
                                    회원가입하기
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Button
                variant="contained"
                sx={{ position: "absolute", right: 0, top: 0, m: 2 }}
                onClick={(e) => {
                    navigate("/signup");
                }}
            >
                Sign Up
            </Button>
        </Container>
    );
};

export default SignIn;

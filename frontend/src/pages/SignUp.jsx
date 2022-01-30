import React from "react";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import KeyIcon from "@mui/icons-material/Key";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../components/Logo";
import signup from "../apis/signup";

export default function SignUp() {
    // 네비게이트 훅
    const navi = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsonData = {
            email: data.get("email"),
            password: data.get("password"),
            password_check: data.get("passwordCheck"),
            nickname: data.get("nickname"),
        };
        try {
            // 회원가입 시도
            const response = await signup(jsonData);
            console.log(response.status); // 회원가입 성공 여부

            // 회원가입 성공 시
            if (response.status === 200) {
                // 로그인 페이지로 가기
                navi("/signin");
            } else {
                alert("성공적인 회원가입이 되지 않았습니다!");
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
            component="main"
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1460467820054-c87ab43e9b59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2867&q=80)",
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
                    <KeyIcon />
                </Avatar>
                <Box
                    component="form"
                    noValidate
                    onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="nickname"
                                name="nickname"
                                required
                                fullWidth
                                id="nickname"
                                label="닉네임"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="이메일"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                name="passwordCheck"
                                label="비밀번호 재확인"
                                type="password"
                                id="password-check"
                                autoComplete="new-password-check"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/signin">
                                <Typography variant="body2">
                                    이미 회원이신가요?
                                </Typography>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
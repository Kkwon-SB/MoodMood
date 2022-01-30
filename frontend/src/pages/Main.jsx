import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import Calendar from "../components/Calendar";
import MainChart from "../components/MainChart";
import MainDiaries from "../components/MainDiaries";

import BasicLayout from "../layouts/BasicLayout";

const Main = () => {
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);
    const navigate = useNavigate();

    return (
        <BasicLayout>
            <Grid item xs={12} md={6} lg={5}>
                <Paper sx={{ width: "100%", height: "100%" }} elevation={3}>
                    <Calendar />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={7}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        
                    }}
                    elevation={3}
                >
                    <MainChart />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "scroll",
                        p: 3,
                        maxHeight: 200,
                        backgroundColor: "#eeeeee",
                    }}
                    elevation={3}
                >
                    <MainDiaries />
                </Paper>
            </Grid>
        </BasicLayout>
    );
};

export default Main;

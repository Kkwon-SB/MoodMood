import React from "react";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import MyInfo from "../components/MyInfo";
import MyInfoButtons from "../components/MyInfoButtons";

import BasicLayout from "../layouts/BasicLayout";

const Me = () => {
    return (
        <BasicLayout>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContents: "space-between",
                        alignItems: "center",
                        p: 10,
                    }}
                    elevation={3}
                >
                    <MyInfo />
                    <Grid item xs={12}>
                        <MyInfoButtons />
                    </Grid>
                </Paper>
            </Grid>
        </BasicLayout>
    );
};

export default Me;

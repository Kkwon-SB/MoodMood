import React from "react";

import { useRecoilState } from "recoil";
import { dateAtom } from "../recoils/diary";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

import BasicEditor from "../components/BasicEditor";
import DiaryDateInput from "../components/DiaryDateInput";
import DiaryWriteButtons from "../components/DiaryWriteButtons";

import BasicLayout from "../layouts/BasicLayout";

const DiaryWrite = () => {
    // eslint-disable-next-line no-unused-vars
    const [date, setDate] = useRecoilState(dateAtom);

    const yearStr = date.getFullYear();
    const monthNum = date.getMonth() + 1;
    const dateNum = date.getDate();
    const monthStr = monthNum < 10 ? `0${monthNum}` : monthNum;
    const dateStr = dateNum < 10 ? `0${dateNum}` : dateNum;
    const numDate = `${yearStr}-${monthStr}-${dateStr}`;
    return (
        <BasicLayout>
            <Grid item>
                <DiaryDateInput />
            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        width: "100%",
                        height: 530,
                        overflow: "scroll",
                        position: "relative",
                    }}
                    elevation={5}
                >
                    <BasicEditor selectedDate={numDate} id={numDate} />
                </Paper>
            </Grid>
            <Grid
                item
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "flex-end",
                }}
            >
                <DiaryWriteButtons />
            </Grid>
        </BasicLayout>
    );
};

export default DiaryWrite;

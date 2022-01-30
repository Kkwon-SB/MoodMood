import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Sidebar from "../components/Sidebar";
import AppHeader from "../components/AppHeader";

const BasicLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            <Container sx={{ mt: 1, mb: 4 }}>
                <Grid
                    sx={{ width: "100%", m: 0, ml: -1 }}
                    container
                    item
                    spacing={2}
                >
                    <Grid item xs={12} md={3}>
                        <Paper
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                            elevation={3}
                        >
                            <Sidebar />
                        </Paper>
                    </Grid>
                    <Grid item container spacing={2} xs={12} md={9}>
                        {children}
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default BasicLayout;

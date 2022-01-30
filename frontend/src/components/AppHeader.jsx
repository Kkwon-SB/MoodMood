import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Logo from "./Logo";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material";

const AppHeader = () => {
    const navi = useNavigate();

    const theme = useTheme();
    return (
        <AppBar sx={{ position: "sticky" }}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mr: 1,
                    ml: 1,
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        maxWidth:
                            1200 - Number(theme.spacing(8).replace(/px/, "")),
                        justifyContent: "space-between",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            width: 150,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "white",
                        }}
                        onClick={() => {
                            navi("/");
                        }}
                    >
                        <Logo />
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default AppHeader;

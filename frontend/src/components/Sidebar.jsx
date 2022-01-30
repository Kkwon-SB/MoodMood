import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { photo as ptatom, nickname as nkatom } from "../recoils/userInfo";
import { useNavigate } from "react-router";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import MyInfoButtons from "./MeButtons";
import { readUser } from "../apis/user";

const pagesInfo = [
    {
        text: "일기 쓰기",
        url: "/diary/write",
    },
    {
        text: "목록",
        url: "/diary",
    },
    {
        text: "공감한 게시글",
        url: "/diary/symp",
    },
    {
        text: "열린게시판",
        url: "/diary/opened",
    },
];

const Sidebar = () => {
    const navi = useNavigate();
    const [nickname, setNickname] = useRecoilState(nkatom);
    const [photo, setPhoto] = useRecoilState(ptatom);

    const naviHandlerFunc = (path) => {
        return () => {
            navi(path);
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = await readUser();
                const n = userInfo.nickname;
                const p = userInfo.photo;
                if (n && p) {
                    setNickname(n);
                    setPhoto(
                        `${process.env.PUBLIC_URL}/images/default-profile.png"`
                    );
                } else {
                    alert("잘못된 접근!");
                    navi("/signin");
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Box
                sx={{
                    height: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    mt: 2,
                }}
            >
                <Avatar
                    variant="rounded"
                    alt="avatar profile"
                    src={photo}
                    sx={{
                        width: "60%",
                        maxWidth: 200,
                        height: "auto",
                        bgcolor: "#b2cefe",
                    }}
                />
                <Typography sx={{ mt: 3, textAlign: "center" }} variant="h4">
                    {nickname || "..."}
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    mb: 4,
                }}
            >
                <MyInfoButtons />
            </Box>

            <List>
                {pagesInfo.map((pInfo) => {
                    return (
                        <ListItem key={pInfo.text} disablePadding>
                            <ListItemButton
                                onClick={naviHandlerFunc(pInfo.url)}
                                sx={
                                    pInfo.color
                                        ? {
                                            color: pInfo.color,
                                            backgroundColor: pInfo.backColor,
                                        }
                                        : undefined
                                }
                            >
                                <ListItemText primary={pInfo.text} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default Sidebar;

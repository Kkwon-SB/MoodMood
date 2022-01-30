import React from "react";
import { useRecoilState } from "recoil";
import { photo as ptatom } from "../recoils/userInfo";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { deleteUserImage, updateUserImage } from "../apis/user";

const MyInfoImageButtons = () => {
    const [photo, setPhoto] = useRecoilState(ptatom);

    const updateImage = async () => {
        try {
            const res = await updateUserImage();
        } catch (e) {
            console.log(e);
            alert("이미지 수정 안됨!");
        }
    };

    const deleteImage = async () => {
        try {
            const res = await deleteUserImage();
        } catch (e) {
            console.log(e);
            alert("이미지 삭제 안됨!");
        }
    };

    return (
        <Box sx={{ display: "flex", m: 2 }}>
            <Button
                sx={{ mr: 1 }}
                onClick={() => updateImage()}
                variant="contained"
                color="secondary"
            >
                <Typography>이미지 업데이트</Typography>
            </Button>

            <Button
                onClick={() => deleteImage()}
                variant="contained"
                color="secondary"
            >
                <Typography>이미지 삭제</Typography>
            </Button>
        </Box>
    );
};

export default MyInfoImageButtons;

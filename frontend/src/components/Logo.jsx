import React from "react";
import Box from "@mui/material/Box";

/**
 * 로고 이미지 컴포넌트
 * @returns
 */
const Logo = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <img
                width="100%"
                height="auto"
                src={`${process.env.PUBLIC_URL}/images/logo.png`}
                alt="logo"
            />
        </Box>
    );
};

export default Logo;

import React from "react";

import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

/**
 * "all":
    emotion = [
        "fear",
        "surprise",
        "anger",
        "sadness",
        "neutrality",
        "happiness",
        "disgust",
    ]
    */
export const UnicodeEmoMap = {
    neutrality: "\u{1F601}",
    fear: "\u{1F628}",
    happiness: "\u{1F603}",
    surprise: "\u{1F62E}",
    anger: "\u{1F620}",
    sadness: "\u{1F61E}",
    disgust: "\u{1F922}",
};

const KoreanEmoMap = {
    neutrality: "보통",
    fear: "공포",
    happiness: "행복",
    surprise: "놀람",
    anger: "화남",
    sadness: "슬픔",
    disgust: "혐오",
};

const DiaryListDropdown = ({ emotionFilter, setEmotionFilter, isNoAll }) => {
    return (
        <>
            <InputLabel id="emotion-select-label">감정</InputLabel>
            <Select
                labelId="emotion-select-label"
                id="emotion-select"
                value={emotionFilter}
                onChange={(e) => setEmotionFilter(e.target.value)}
                sx={{ minWidth: 200, mr: 2, height: 40 , bottom:2}}
            >
                {!isNoAll && <MenuItem value={"all"}>All</MenuItem>}
                {Object.keys(UnicodeEmoMap).map((emoKey) => 
                    <MenuItem key={emoKey} value={emoKey}>
                        {`${UnicodeEmoMap[emoKey]} ${KoreanEmoMap[emoKey]}`}
                    </MenuItem>
                )}
            </Select>
        </>
    );
};

export default DiaryListDropdown;
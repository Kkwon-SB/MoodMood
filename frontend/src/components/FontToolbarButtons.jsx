import React from "react";
import { MARK_COLOR, MARK_BG_COLOR } from "@udecode/plate";
import { ColorPickerToolbarDropdown } from "@udecode/plate-font-ui";
import { FormatColorText, FontDownload, Check } from "@styled-icons/material";

const FontToolbarButtons = () => {
    return (
        <>
            <ColorPickerToolbarDropdown
                pluginKey={MARK_COLOR}
                icon={<FormatColorText />}
                selectedIcon={<Check />}
                tooltip={{ content: "글자 색" }}
            />
            <ColorPickerToolbarDropdown
                pluginKey={MARK_BG_COLOR}
                icon={<FontDownload />}
                selectedIcon={<Check />}
                tooltip={{ content: "글 배경" }}
            />
        </>
    );
};

export default FontToolbarButtons;

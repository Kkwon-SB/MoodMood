import React from "react";
import {
    Plate,
    createParagraphPlugin,
    createBlockquotePlugin,
    createHeadingPlugin,
    createPlugins,
    createPlateUI,
    HeadingToolbar,
} from "@udecode/plate";
import BasicEditorToolbar from "./BasicEditorToolbar";

const editableProps = {
    placeholder: "내용을 입력해 주세요…",
    style: {
        padding: "15px",
    },
};

const BasicEditor = ({ selectedDate, id }) => {
    const initVal = () => {
        const str = localStorage.getItem(selectedDate);
        return JSON.parse(str);
    };

    const plugins = createPlugins(
        [
            // elements
            createParagraphPlugin(), // paragraph element
            createBlockquotePlugin(), // blockquote element
            createHeadingPlugin(), // heading elements
        ],
        {
            components: createPlateUI(),
        }
    );

    return (
        <>
            <Plate
                id={id ?? "1"}
                editableProps={editableProps}
                initialValue={initVal()}
                plugins={plugins}
            >
                <HeadingToolbar
                    styles={{
                        root: {
                            position: "sticky",
                            backgroundColor: "#fafafa",
                            zIndex: 4,
                            width: "100%",
                            paddingLeft: "0",
                            paddingRight: "0",
                            marginLeft: "0",
                        },
                    }}
                >
                    <BasicEditorToolbar />
                </HeadingToolbar>
            </Plate>
        </>
    );
};

export default BasicEditor;

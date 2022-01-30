import React, { useEffect, useState } from "react";
import {
    Plate,
    createParagraphPlugin,
    createBlockquotePlugin,
    createHeadingPlugin,
    createPlugins,
    createPlateUI,
} from "@udecode/plate";

const editableProps = {
    placeholder: "Type…",
    style: {
        padding: 15,
        backgroundColor: "white",
        marginTop: 15,
    },
    readOnly: true,
};

const ReadonlyEditor = ({ content, id }) => {
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
                value={JSON.parse(content)}
                plugins={plugins}
            ></Plate>
        </>
    );
};

export default ReadonlyEditor;

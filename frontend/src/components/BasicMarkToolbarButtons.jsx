import {
    usePlateEditorRef,
    MarkToolbarButton,
    getPluginType,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_UNDERLINE,
    MARK_STRIKETHROUGH,
    MARK_CODE,
    MARK_SUPERSCRIPT,
    MARK_SUBSCRIPT,
} from "@udecode/plate";

import {
    FormatBold,
    FormatItalic,
    FormatUnderlined,
    FormatStrikethrough,
    Superscript,
    Subscript,
} from "@styled-icons/material";

import { CodeAlt } from "@styled-icons/boxicons-regular";

const BasicMarkToolbarButtons = () => {
    const editor = usePlateEditorRef();

    return (
        <>
            <MarkToolbarButton
                type={getPluginType(editor, MARK_BOLD)}
                icon={<FormatBold />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_ITALIC)}
                icon={<FormatItalic />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_UNDERLINE)}
                icon={<FormatUnderlined />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_STRIKETHROUGH)}
                icon={<FormatStrikethrough />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_CODE)}
                icon={<CodeAlt />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUPERSCRIPT)}
                clear={getPluginType(editor, MARK_SUBSCRIPT)}
                icon={<Superscript />}
            />
            <MarkToolbarButton
                type={getPluginType(editor, MARK_SUBSCRIPT)}
                clear={getPluginType(editor, MARK_SUPERSCRIPT)}
                icon={<Subscript />}
            />
        </>
    );
};

export default BasicMarkToolbarButtons;

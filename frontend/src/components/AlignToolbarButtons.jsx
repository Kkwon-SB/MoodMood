import { usePlateEditorRef, AlignToolbarButton } from "@udecode/plate";
import {
    FormatAlignLeft,
    FormatAlignCenter,
    FormatAlignRight,
    FormatAlignJustify,
} from "@styled-icons/material";

const AlignToolbarButtons = () => {
    const editor = usePlateEditorRef();

    return (
        <>
            <AlignToolbarButton value="left" icon={<FormatAlignLeft />} />
            <AlignToolbarButton value="center" icon={<FormatAlignCenter />} />
            <AlignToolbarButton value="right" icon={<FormatAlignRight />} />
            <AlignToolbarButton value="justify" icon={<FormatAlignJustify />} />
        </>
    );
};

export default AlignToolbarButtons;

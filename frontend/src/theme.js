import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: "#7646A6",
            light: "#9E6ED4",
            dark: "#C8AAFF",
        },
        secondary: {
            main: "#992E82",
            light: "#F5B8C6",
            dark: "#F4F0FF",
            etc: "#b56dca"

        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;
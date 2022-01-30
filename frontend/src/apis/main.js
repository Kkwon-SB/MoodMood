import axios from "axios";
import getUrl from "./getUrl";


export const readMain = async () => {
    const url = getUrl(`/api/main`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

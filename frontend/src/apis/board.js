import axios from "axios";
import getUrl from "./getUrl";

/**
 * 열린게시판article_id:
                        type: integer
                      date:
                        type: integer # date
                      sympathy_count:
                        type: integer
                      text:
                        type: string
                      emotion:
                        type: string

 *
 * @returns {{artcle_id: number, date: number, sympathy_count: number, text: string, emotion: string}}
 */
export const readBoard = async () => {
    const url = getUrl(`/api/board`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

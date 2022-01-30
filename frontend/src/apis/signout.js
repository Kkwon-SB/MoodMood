import axios from "axios";
import getUrl from "./getUrl";

/**
 * 로그인 api 요청
 *
 * @returns
 */
const signout = async () => {
    const url = getUrl("/api/logout"); // url 생성 => http://elice~~~~/login
    try {
        // => 일단 시도해보고, 에러가 나면 실행을 멈추고 => catch scope 안으로 들어가요.
        const response = await axios.get(url, {
            withCredential: true,
        });
        console.log(response);
        return response.data;
        // axios.post(~~).then(() => {}).catch((e) => {})
    } catch (e) {
        console.log(e);
    }
};

export default signout;

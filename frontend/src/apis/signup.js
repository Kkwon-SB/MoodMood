import axios from "axios";
import getUrl from "./getUrl";

/**
 * 회원가입 요청
 * @param {{email: string, password: string, passwordCheck: string, nickname: string}} signupData
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}} 응답객체
 * config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, adapter: ƒ, …}
 * data: {result: "Email and Password don't match" }
 * headers: {access-control-allow-credentials: 'true', access-control-allow-origin: 'http://elice-kdt-2nd-team8.koreacentral.cloudapp.azure.com', connection: 'keep-alive', content-length: '49', content-type: 'application/json', …}
 * request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
 * status: 200
 * statusText: "OK"
 */
const signup = async (signupData) => {
    const url = getUrl("/api/signup");
    try {
        const response = await axios.post(url, signupData, {
            withCredentials: true,
        });
        return response;
    } catch (e) {
        console.log(e);
    }
};
export default signup;

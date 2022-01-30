import axios from "axios";
import getUrl from "./getUrl";

/**
 * 로그인 api 요청
 *
 * @param signinData  {{email: string, password: string}} loginData
 * @returns
 */
const signin = async (signinData) => {
  const url = getUrl("/api/login"); // url 생성 => http://elice~~~~/login
  try {
    // => 일단 시도해보고, 에러가 나면 실행을 멈추고 => catch scope 안으로 들어가요.
    const response = await axios.post(url, signinData, {
      withCredential: true,
    });
    console.log("i am the response");
    console.log(response);
    return response.data;

    // axios.post(~~).then(() => {}).catch((e) => {})
  } catch (e) {
    console.log(e);
  }
};

export default signin;

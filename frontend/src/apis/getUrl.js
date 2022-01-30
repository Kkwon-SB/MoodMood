/**
 * 백엔드에 요청을 보내기 위한 Url 생성
 * 
 * 필수 url 경로
 * @param {string} path
 * @returns modified url full path
 * 환경변수에서 백엔드 url 읽어와서 거기에 더해주는... 으로 생각하고 썼습니다...
 */
const getUrl = (path) => {
    return `${process.env.REACT_APP_BACKEND_URL}${path}`;
};

export default getUrl;

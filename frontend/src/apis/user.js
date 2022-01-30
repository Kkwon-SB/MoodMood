import axios from "axios";
import getUrl from "./getUrl";

/**
 * 쿠키 토대로 유저 정보 불러오기
 *
 * @param {string} date
 * @returns {{photo: string, email: string, nickname: string}}
 */
export const readUser = async () => {
    const url = getUrl(`/api/user`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 쿠키 토대로 유저 정보 불러오기
 *
 * @param {{nickname: string, password: string, password_check: string}} userData
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}}
 */
export const updateUser = async (userData) => {
    const url = getUrl(`/api/user`);
    try {
        const res = await axios.patch(url, userData);
        return res;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 쿠키 토대로 유저 이미지 업데이트
 *
 * @param {{}} imageFormData
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}}
 */
export const updateUserImage = async (imageFormData) => {
    const url = getUrl(`/api/user/image`);
    try {
        const res = await axios.patch(url, imageFormData);
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 쿠키 토대로 유저 이미지 삭제하기
 *
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}}
 */
export const deleteUserImage = async () => {
    const url = getUrl(`/api/user/image`);
    try {
        const res = await axios.delete(url);
        return res;
    } catch (e) {
        console.log(e);
    }
};

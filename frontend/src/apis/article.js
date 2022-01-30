import axios from "axios";
import getUrl from "./getUrl";

/**
 * 글 작성
 *
 * @param writeData  {{text: string, date: number}}  콘텐츠 데이터
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}} responseobject
 */
export const createArticle = async (writeData) => {
    const url = getUrl(`/api/article`);
    try {
        console.log(writeData);
        const response = await axios.post(url, writeData);
        return response;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 수정
 *
 * @param {string} date
 * @param {string} writeData
 * @returns {{config: any, data: {result: 'string'}, headers: any, request: any, status: number, statusText: string}}  response object
 */
export const updateArticle = async (date, writeData) => {
    const url = getUrl(`/api/article/${date}`);
    try {
        const response = await axios.patch(url, { text: writeData });
        return response;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 삭제
 *
 * @param {string} date
 * @returns
 */
export const deleteArticle = async (date) => {
    const url = getUrl(`/api/article/${date}`);
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 글 읽기
 *
 * date=diary.date.strftime("%Y-%m-%d"),
 * text=diary.text,
 * emotion=diary.emotion,
 * is_shared=diary.is_shared,
 * is_sharable=diary.is_sharable,
 *
 * @param {string} date
 * @returns {{date: string, text: string, emotion: string, is_shared: boolean, is_sharable: boolean}}}
 */
export const readArticle = async (date) => {
    const url = getUrl(`/api/article/${date}`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 감정 바꾸기
 *
 * @param {string} date
 * @param {string} emotion
 * @returns
 */
export const updateEmotion = async (date, emotion) => {
    const url = getUrl(`/api/article/${date}/${emotion}`);
    try {
        const response = await axios.patch(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 공개 비공개
 *
 * @param {string} date
 * @param {number} isShared
 * @returns
 */
export const updateIsShared = async (date, isShared) => {
    const url = getUrl(`/api/article/${date}/${isShared}`);
    try {
        const response = await axios.patch(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

/**
 * 사용자의 모든 글 읽어오기
 *
 * @param {string}
 * @returns
 */
export const readArticles = async () => {
    const url = getUrl(`/api/article/my-list`);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

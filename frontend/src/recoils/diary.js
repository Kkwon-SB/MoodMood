import { atom } from "recoil";

export const dateAtom = atom({ key: "date", default: new Date() });
export const isUpdateNow = atom({ key: "isUpdateDiary", default: false });
export const emotion = atom({ key: "emo", default: "sadness" });
export const isAnony = atom({ key: "isAnony", default: true });
export const isSharable = atom({ key: "isSharable", default: true });

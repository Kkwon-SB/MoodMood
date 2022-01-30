import { atom } from "recoil";

export const nickname = atom({ key: "userInfo", default: "" });
export const photo = atom({ key: "photo", default: "/images/default-profile.png" });
export const password = atom({ key: "pw", default: "" });
export const passwordRetry = atom({ key: "pwRtr", default: "" });

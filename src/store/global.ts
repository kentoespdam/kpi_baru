import { atom } from "recoil";
import { User } from "./types";

export const userState = atom<User>({
	key: "user",
	default: undefined,
});

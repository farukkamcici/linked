import { customAlphabet } from "nanoid";
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
export const generateSlug = customAlphabet(alphabet, 6);

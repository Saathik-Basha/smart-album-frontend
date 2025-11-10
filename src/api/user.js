import { API_URL } from "../constants/api";
// eslint-disable-next-line no-unused-vars
import { encodeQueryParams } from "../utils/encodeQueryParams";

export const registerUser = (data) => {
    return fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

export const loginUser = (data) => {
    return fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
};

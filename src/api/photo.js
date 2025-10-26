import { encodeQueryParams } from "../utils/encodeQueryParams";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log({ API_URL });

export const uploadPhoto = (body) =>
    fetch(API_URL, {
        method: "POST",
        body: body,
    });

export const fetchPhotos = ({ queryKey, pageParam }) => {
    const [_key, { limit }] = queryKey;
    return fetch(
        `${API_URL}?${encodeQueryParams({
            limit,
            ...(pageParam ? { startKey: pageParam } : {}),
        })}`
    ).then((res) => res.json());
};

      

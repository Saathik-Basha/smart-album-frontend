import { encodeQueryParams } from "../utils/encodeQueryParams";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");


console.log({ API_URL });

export const uploadPhoto = (body) =>
  fetch(API_URL, {
    method: "POST",
    body: body,
  });

export const fetchPhotos = ({ queryKey, pageParam }) => {
  const [_key, { limit, label }] = queryKey;
  return fetch(
    `${API_URL}?${encodeQueryParams({
      limit,
      label,
      startKey: pageParam,
    })}`
  ).then((res) => res.json());
};

export const updatePhoto = (data) => {
  return fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const deletePhoto = ({ primary_key, name }) => {
  return fetch(`${API_URL}/delete`, {
    method: "DELETE",
    body: JSON.stringify({ primary_key, name }),
  });
};

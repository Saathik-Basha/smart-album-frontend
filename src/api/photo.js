import { Cookies } from "react-cookie";
import { API_URL } from "../constants/api";
import { encodeQueryParams } from "../utils/encodeQueryParams";

console.log({ API_URL });
const cookies = new Cookies();

export const uploadPhoto = (body) =>
  fetch(API_URL, {
    method: "POST",
    body: body,
    headers: {
      Authorization: `Bearer ${cookies.get("AccessToken")}`,
    },
  });

export const fetchPhotos = ({ queryKey, pageParam }) => {
  const [_key, { limit, label }] = queryKey;
  return fetch(
    `${API_URL}?${encodeQueryParams({
      limit,
      label,
      startKey: pageParam,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${cookies.get("AccessToken")}`,
      },
    }
  ).then((res) => res.json());
};

export const updatePhoto = (data) => {
  return fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("AccessToken")}`,
    },
    body: JSON.stringify(data),
  });
};

export const deletePhoto = ({ primary_key, name }) => {
  return fetch(`${API_URL}/delete`, {
    method: "DELETE",
    body: JSON.stringify({ primary_key, name }),
    headers: {
      Authorization: `Bearer ${cookies.get("AccessToken")}`,
    },
  });
};

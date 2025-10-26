const API_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

export const uploadPhoto = (body) => 
    fetch(API_URL, {
        method: "POST",
        body: body,
    });

export const fetchPhotos = () => {
  return fetch(API_URL)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
};

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const uploadPhoto = (body) => 
    fetch(API_URL, {
        method: "POST",
        body: body,
    });

export const fetchPhotos = () => {
  return fetch(API_URL)
    .then((res) => {
      if (!res.ok) {
        console.log("API_URL:", API_URL);
        throw new Error("Network response was not ok");
      }
      return res.json();
    });
};

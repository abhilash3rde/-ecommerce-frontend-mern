import { baseUrl } from "../../components/Constants";

export const rest = {
  post: (url, body) =>
    fetch(`${baseUrl}${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }),
  get: (url, body) => {
    if (body)
      return fetch(`${baseUrl}${url}${body}`, {
        method: "GET",
        mode: "cors"
      });

    return fetch(`${baseUrl}${url}`, {
      method: "GET",
      mode: "cors"
    });
  }
};

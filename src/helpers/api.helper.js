import axios from "axios";

export const useRelatedApi = async (url, method, payload) => {
  //   const apiUrl = `https://user-api-k6g6.onrender.com/api/${url}`;
  const apiUrl = `http://localhost:3000/api/${url}`;
  const httpMethod = method.toUpperCase();
  let result;
  switch (httpMethod) {
    case "GET":
      try {
        result = await axios.get(apiUrl);
        return result.data;
      } catch (error) {
        return error.response;
      }

    case "POST":
      try {
        result = await axios.post(apiUrl, payload);
        return result.data;
      } catch (error) {
        return error.response.data;
      }
    case "PUT":
      try {
        result = await axios.put(apiUrl, payload);
        return result.data;
      } catch (error) {
        return error.response.data;
      }

    case "DELETE":
      try {
        result = await axios.delete(apiUrl, payload);
        return result.data;
      } catch (error) {
        return error.response;
      }
  }
};

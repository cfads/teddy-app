import axios from "axios";

export const api = axios.create({
  baseURL: "https://644060ba792fe886a88de1b9.mockapi.io",
});

export const fetchParceiros = async () => {
  const { data } = await api.get("/v1/test/partners");

  return data;
};

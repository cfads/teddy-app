import axios from "axios";
import { Parceiro } from "../types/Parceiro";

export const api = axios.create({
  baseURL: "https://644060ba792fe886a88de1b9.mockapi.io",
});

export const fetchParceiros = async () => {
  const { data } = await api.get("/v1/test/partners");

  return data;
};

export const createParceiro = async (parceiro: Parceiro) => {
  const { data } = await api.post("/v1/test/partners", parceiro);
  return data;
};

export const updateParceiro = async (id: string, parceiro: Partial<Parceiro>) => {
  const { data } = await api.put(`/v1/test/partners/${id}`, parceiro);
  return data;
};

export const fetchParceiro = async (id: string) => {
  const { data } = await api.get(`/v1/test/partners/${id}`);
  return data;
};

export const deleteParceiro = async (id: string) => {
  const { data } = await api.delete(`/v1/test/partners/${id}`);
  return data;
};

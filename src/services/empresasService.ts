import axios from "axios";
import { Empresa } from "../types/Empresa";

export const api = axios.create({
  baseURL: "https://655cf25525b76d9884fe3153.mockapi.io/v1",
});

export const fetchEmpresas = async () => {
  const { data } = await api.get("/external-companies");

  return data;
};

export const createEmpresa = async (empresa: Empresa) => {
  const { data } = await api.post("/external-companies", empresa);
  return data;
};

export const updateEmpresa = async (id: string, empresa: Partial<Empresa>) => {
  const { data } = await api.put(`/external-companies/${id}`, empresa);
  return data;
};

export const fetchEmpresa = async (id: string) => {
  const { data } = await api.get(`/external-companies/${id}`);
  return data;
};

export const deleteEmpresa = async (id: string) => {
  const { data } = await api.delete(`/external-companies/${id}`);
  return data;
};

import axios from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL!;

export const getTodos = () => {
  return axios.get(baseUrl);
};

export const addTodo = (data: any) => {
  return axios.post(baseUrl, data);
};

export const editTodo = (data: any) => {
  return axios.put(`${baseUrl}/${data.id}`, data);
};

export const deleteTodo = (id: any) => {
  return axios.delete(`${baseUrl}/${id}`);
};

import axios from "axios";

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL!;

export const getTodos = () => {
  return axios.get(baseUrl);
};

export const addTodo = (data: any) => {
  return axios.post(baseUrl, data);
};

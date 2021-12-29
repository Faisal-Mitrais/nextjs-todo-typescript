import axios from 'axios';
import { Todo } from 'store/todo/todoSlice';

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const getTodos = () => {
  return axios.get(baseUrl);
};

export const addTodo = (data: Todo) => {
  return axios.post(baseUrl, data);
};

export const editTodo = (data: Todo) => {
  return axios.put(`${baseUrl}/${data.id}`, data);
};

export const deleteTodo = (id: string | number) => {
  return axios.delete(`${baseUrl}/${id}`);
};

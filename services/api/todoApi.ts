import axios from 'axios';
import { Todo } from 'store/todo/todoSlice';

const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL ?? '';

export const getTodos = async () => {
  return await axios.get(baseUrl).then((res) => {
    return res?.data;
  });
};

export const addTodo = async (data: Todo) => {
  return await axios.post(baseUrl, data).then((res) => {
    return res?.data;
  });
};

export const editTodo = async (data: Todo) => {
  return await axios.put(`${baseUrl}/${data.id}`, data).then(() => {
    return data;
  });
};

export const deleteTodo = async (id: string | number) => {
  return await axios.delete(`${baseUrl}/${id}`).then(() => {
    return id;
  });
};

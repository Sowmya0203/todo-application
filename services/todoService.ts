import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const getTodos = (params?: Record<string, any>) => axios.get(API_URL, { params });
export const createTodo = (title: string, extra?: Record<string, any>) =>
  axios.post(`${API_URL}/add`, { title, ...extra });
export const smartAdd = (text: string) =>
  axios.post(`${API_URL}/smart-add`, { text });
export const updateTodo = (id: number, title: string) =>
  axios.put(`${API_URL}/${id}`, { title });
export const toggleTodo = (id: number) =>
  axios.put(`${API_URL}/${id}/toggle`);
export const deleteTodo = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
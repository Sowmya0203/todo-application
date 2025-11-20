import axios from "axios";

const API_URL = "http://localhost:4000/api/todos";

export const getTodos = () => axios.get(API_URL);
export const createTodo = (title: string) => axios.post(API_URL, { title });
export const updateTodo = (id: number, title: string) =>
  axios.put(`${API_URL}/${id}`, { title });
export const deleteTodo = (id: number) =>
  axios.delete(`${API_URL}/${id}`);


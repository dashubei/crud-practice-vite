import ky from "ky";
import { API_URL } from "../const";
import type { Todo } from "../../types/todo";

export const executeDelete = async (id: number) =>
  await ky.delete(`${API_URL}/${id}`).json<Todo[]>();

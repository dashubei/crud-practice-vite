import ky from "ky";
import { API_URL } from "../const";
import type { Todo } from "../../types/todo";

export const postTodo = async (id: number, title: string) =>
  await ky
    .post(`${API_URL}`, {
      json: {
        id,
        title,
        completed: false,
      },
    })
    .json<Todo[]>();

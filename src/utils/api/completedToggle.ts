import ky from "ky";
import { API_URL } from "../const";
import type { Todo } from "../../types/todo";

export const completedToggle = async (
  id: number,
  title: string,
  isCompleted: boolean
) =>
  await ky
    .put(`${API_URL}/${id}`, {
      json: {
        id,
        title,
        completed: isCompleted,
      },
    })
    .json<Todo[]>();

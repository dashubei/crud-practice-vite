import ky from "ky";
import { API_URL } from "../const";
import type { Todo } from "../../types/todo";

export const getTodo = async () => await ky.get(`${API_URL}`).json<Todo[]>();

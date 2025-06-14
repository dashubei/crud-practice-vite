import { useEffect, useState } from "react";
import { API_URL } from "./utils/const";
import type { Todo } from "./types/todo";
import ky from "ky";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputVal, setInputVal] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      try {
        const response = await ky.get(`${API_URL}/todos`).json<Todo[]>();
        setTodos(response);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, []);

  const handleDone = async (id: number, title: string) => {
    const confirm = window.confirm("完了しますか？");
    console.log(confirm);
    if (!confirm) return;

    try {
      const response = await ky
        .put(`${API_URL}/todos/${id}`, {
          json: {
            id,
            title,
            completed: true,
          },
        })
        .json<Todo[]>();
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInComplete = async (id: number, title: string) => {
    const confirm = window.confirm("未完了にしますか？");
    console.log(confirm);
    if (!confirm) return;

    try {
      const response = await ky
        .put(`${API_URL}/todos/${id}`, {
          json: {
            id,
            title,
            completed: false,
          },
        })
        .json<Todo[]>();
      setTodos(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = () => {};

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (inputVal === "") return;
    e.preventDefault();
    try {
      const response = await ky
        .post(`${API_URL}/todos`, {
          json: {
            id: todos.length + 1,
            title: inputVal,
            completed: false,
          },
        })
        .json<Todo[]>();

      setTodos(response);
      setInputVal("");
    } catch (error) {
      console.error(error);
      alert("追加できませんでした");
    }
  };
  return (
    <>
      <ul>
        {todos.map((item) => (
          <li key={item.id}>
            {item.completed ? <s>{item.title}</s> : <span>{item.title}</span>}
            <button
              type="button"
              onClick={() => {
                if (item.completed) handleInComplete(item.id, item.title);
                else handleDone(item.id, item.title);
              }}
            >
              {item.completed ? "未完了" : "完了"}
            </button>
            <button type="button" onClick={handleDelete}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <input type="submit" value="追加" />
      </form>
    </>
  );
};

export default App;

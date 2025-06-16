import { useEffect, useState } from "react";
import { API_URL } from "./utils/const";
import type { Todo } from "./types/todo";
import ky from "ky";
import Loading from "./components/loading/loading";

// やりたいこと
// react-hook-form
// 削除や編集のときはidのみを送って
// responseは成功したかどうかのみを返してもらいフロントの配列を編集する

const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputVal, setInputVal] = useState<string>("");

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const response = await ky.get(`${API_URL}/todos`).json<Todo[]>();
        setTodos(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // 完了・未完了
  const handleDone = async (id: number, title: string) => {
    setIsLoading(true);

    try {
      const response = await ky
        .put(`${API_URL}/todos/${id}`, {
          json: {
            id,
            title,
            completed: !todos[id - 1].completed,
          },
        })
        .json<Todo[]>();

      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
      setTodos(response);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await ky.delete(`${API_URL}/todos/${id}`).json<Todo[]>();
      setTodos((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputVal === "") return;

    setIsLoading(true);
    try {
      await ky
        .post(`${API_URL}/todos`, {
          json: {
            id: todos.length + 1,
            title: inputVal,
            completed: false,
          },
        })
        .json<Todo[]>();

      setTodos((prev) => [
        ...prev,
        { id: todos.length + 1, title: inputVal, completed: false },
      ]);
      setInputVal("");
    } catch (error) {
      console.error(error);
      alert(`追加できませんでした\n${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ul>
            {todos.map((item) => (
              <li key={item.id}>
                {item.completed ? (
                  <s>{item.title}</s>
                ) : (
                  <span>{item.title}</span>
                )}
                <button
                  type="button"
                  onClick={() => handleDone(item.id, item.title)}
                >
                  {item.completed ? "未完了" : "完了"}
                </button>
                <button type="button" onClick={() => handleDelete(item.id)}>
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
        </div>
      )}
    </>
  );
};

export default App;

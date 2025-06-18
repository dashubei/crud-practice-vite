import { useEffect, useState } from "react";
import type { Todo } from "./types/todo";
import Loading from "./components/loading/loading";
import { getTodo } from "./utils/api/getTodo";
import { completedToggle } from "./utils/api/completedToggle";
import { executeDelete } from "./utils/api/executeDelete";
import { postTodo } from "./utils/api/postTodo";
import Button from "./components/ui/button/button";
import FieldWrapper from "./components/ui/form/field-wrapper";
import Input from "./components/ui/form/input";

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
        const response = await getTodo();
        setTodos(response);
      } catch (error) {
        alert(`もう一度読み込み直してください\n${error}`);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  // 完了・未完了
  const handleCompleted = async (id: number, title: string) => {
    setIsLoading(true);

    const isCompleted = todos[id - 1].completed;
    try {
      await completedToggle(id, title, isCompleted);
      setTodos((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, completed: !item.completed } : item
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await executeDelete(id);
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
      await postTodo(todos.length + 1, inputVal);
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
                  onClick={() => handleCompleted(item.id, item.title)}
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
            <FieldWrapper label="TODO">
              <Input type="text" error={undefined} />
            </FieldWrapper>
            <Button text="追加" className="button is-primary" type="submit" />
          </form>
        </div>
      )}
    </>
  );
};

export default App;

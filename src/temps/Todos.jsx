import { useEffect, useMemo, useState } from "react";
import Spinner from "./Spinner.jsx";
import { apiUrl, lsAuthKey } from "./App.jsx";
import TodosItem from "./TodosItem.jsx";

function redirectToIndex() {
  window.localStorage.removeItem(lsAuthKey);
  window.location.reload();
}

const Todos = () => {
  const [isLoading, setLoading] = useState(false);
  const [initial, setInitial] = useState([]);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const userId = window.localStorage.getItem(lsAuthKey);
    if (!userId) redirectToIndex();

    setLoading(true);

    ;(async () => {
      try {
        const response = await fetch(`${apiUrl}/todos?userId=${userId}`);
        const data = await response.json();

        if (response.ok) {
          setInitial(data);
          setTodos(data);
        } else {
          alert(data.error);
          if (response.status === 401) redirectToIndex();
        }
      } catch (e) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // TODO: Не оптимальный вариант
  const isUpdated = useMemo(() => {
    return todos.every((it) => {
      const find = initial.find(el => el.id === it.id);
      return it.completed === find?.completed;
    });
  }, [todos]);

  /**
   * @param {number} id
   */
  function updateTodo(id) {
    setTodos((prev) => {
      return prev.map((it) => {
        return it.id !== id ? it : { ...it, completed: +!it.completed };
      });
    });
  }

  function onUpdateHandler(ev) {
    ev.preventDefault();
    alert("Не раализовано");
  }

  return (
    <>
      <h1>Список тудушек</h1>

      <form onSubmit={onUpdateHandler}>
        <input type="text" placeholder="Название задачи" required />
        <button type="submit" style={{ marginLeft: "8px" }}>Добавить</button>
      </form>

      <form onSubmit={onUpdateHandler}>
        <div>
          {isLoading
            ? (
              <div style={{ padding: "1rem 0" }}><Spinner /></div>
            )
            : (
              <ul style={{ paddingLeft: "0" }}>
                {todos.map((it) => (
                  <TodosItem key={it.id} todo={it} onChange={updateTodo} />
                ))}
              </ul>
            )
          }
        </div>

        <button type="submit" disabled={isUpdated}>Сохранить</button>
      </form>
    </>
  );
};

export default Todos;

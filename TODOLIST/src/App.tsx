import { useState } from "react";
import "./App.css";

export type TodoList = {
  id: number;
  todo: string;
  isDone: boolean;
};

export function App() {
  const [text, setText] = useState<string>("");
  const [todoList, setTodoList] = useState<TodoList[]>([]);

  const addTodo = () => {
    if (!text.trim()) {
      alert("등록할 일정을 입력해주세요!");
      return;
    }
    setTodoList([
      ...todoList,
      { id: todoList.length, todo: text, isDone: false },
    ]);
    setText("");
  };

  const removeTodo = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id != id));
  };
  const toggleChecked = (id: number) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const tasks = () => {
    if (todoList.some((todo) => todo.isDone === true)) {
      return todoList.filter((todo) => todo.isDone === false).length;
    }
    return todoList.length;
  };

  return (
    <div className="mainLayout">
      <div className="top">TodoList</div>
      <div className="todoInput">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘 할 일을 추가해보세요!"
        />
      </div>
      <div className="todoListContainer">
        {todoList.map((todo) => (
          <div key={todo.id} className="todoList">
            <input
              type="checkbox"
              id={"check${todo.id}"}
              checked={todo.isDone}
              onClick={() => toggleChecked(todo.id)}
              className="checkbox-change"
            />
            <label className="chekBoxLabel" htmlFor={"check${todo.id}"}></label>
            <span className={todo.isDone ? "ischeck" : ""}>{todo.todo}</span>
            <button className="removeTodo" onClick={() => removeTodo(todo.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>
      <div className="bottom">
        <div className="item1">오늘 할 일 {tasks()} </div>
        <div className="item2">
          <button className="bottomButton" onClick={addTodo}>
            추가하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

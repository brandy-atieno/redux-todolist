import React from "react";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = [
    { id: 1, title: "Shopping", completed: true },
    { id: 2, title: "Cleaning", completed: true },
    { id: 3, title: "Work on react Project", completed: false },
    { id: 4, title: "Node recap", completed: false },
    { id: 5, title: "Mongodb recap", completed: false },
  ];

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem id={todo.id} title={todo.title} completed={todo.completed} />
      ))}
    </ul>
  );
};

export default TodoList;

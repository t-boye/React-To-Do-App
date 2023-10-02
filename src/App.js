import React, { useState } from 'react';
import { Bootstrap } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    const newTodoObject = {
      id: Math.random(),
      task: newTodo,
      completed: false,
    };

    setTodos([...todos, newTodoObject]);
    setNewTodo('');
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="mx-auto">
        <input
          type="text"
          placeholder="New task"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddTodo}
        >
          Add To-Do
        </button>
      </div>

      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {todo.task}
            <button
              type="button"
              className="btn btn-danger btn-sm float-end"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

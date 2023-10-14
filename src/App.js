import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fuse from 'fuse.js';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [todoNotes, setTodoNotes] = useState([]);
  const [fuse, setFuse] = useState(null);
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  useEffect(() => {
    const todosFromLocalStorage = localStorage.getItem('todos');
    if (todosFromLocalStorage) {
      setTodos(JSON.parse(todosFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Update the Fuse instance when the todos state variable changes.
  useEffect(() => {
    const newFuse = new Fuse(todos, {
      keys: ['task'],
    });
    setFuse(newFuse);
  }, [todos]);

  const handleAddTodo = () => {
    const newTodoObject = {
      id: Math.random(),
      task: newTodo,
      completed: false,
      date: new Date(),
      note: '',
    };

    setTodos([...todos, newTodoObject]);
    setNewTodo('');
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
        todo.note = todoNotes[todo.id];
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);

    delete todoNotes[id];
  };

  const handleSearch = (searchTerm) => {
    // Filter the search results by the task's title, description, and due date.
    const searchResults = fuse.search(searchTerm, {
      keys: ['title', 'description', 'dueDate'],
    });
  
    // If no task is found, display an alert.
    if (searchResults.length === 0) {
      return;
    }
  
    // Update the todos state variable with the search results.
    setTodos(searchResults);
  
    // Highlight the first task in the search results.
    setSelectedTodo(searchResults[0]);
  };
  

  const handleAlert = () => {
    alert('No task found.');
  };

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  }; 

  const handleEditTodo = (todoId) => {
    setEditingTodoId(todoId);
  };

  const handleSaveTodo = (todoId) => {
    const updatedTodo = todos.find((todo) => todo.id === todoId);
    updatedTodo.task = document.getElementById(`todo-input-${todoId}`).value;
    updatedTodo.editedAt = new Date();

    setTodos([...todos.filter((todo) => todo.id !== todoId), updatedTodo]);
    setEditingTodoId(null);
  };

  return (
    <div className="container">
  <h1>To-Do List</h1>

  <div className="d-flex justify-content-center">
      <input
        type="text"
        placeholder="Search for a task"
        onChange={handleSearch}
      />
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => {
          // If no task is found, display an alert.
          if (todos.length === 0) {
            handleAlert();
          }
        }}
      >
        Search
      </button>

    
  <input
    type="text"
    placeholder="New task"
    value={newTodo}
    onChange={(event) => setNewTodo(event.target.value)}
    onKeyPress={(event) => {
      if (event.key === 'Enter') {
        handleAddTodo();
      }
    }}
  />

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleAddTodo}
  >
    Add To-Do
  </button>
</div>

<ul className="list-group list-group-flush">
  {todos.map((todo) => (
    <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleToggleTodo(todo.id)}
      />
      <div className="flex-grow-1">
        <span className="todo-task">{todo.task}</span> - {todo.date.toLocaleDateString()}
      </div>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Add a note"
          value={todoNotes[todo.id]}
          onChange={(event) =>
            setTodoNotes({ ...todoNotes, [todo.id]: event.target.value })
          }
        />

        <button
          type="button"
          className="btn btn-danger btn-sm"
          onClick={() => handleDeleteTodo(todo.id)}
        >
          Delete
        </button>

        {editingTodoId === todo.id && (
          <div className="edit-section">
            <input
              type="text"
              id={`todo-input-${todo.id}`}
              defaultValue={todo.task}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleSaveTodo(todo.id)}
            >
              Save
            </button>
          </div>
        )}

        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() => handleEditTodo(todo.id)}
        >
          Edit
        </button>

        <span> {todo.editedAt && todo.editedAt.toLocaleDateString()}</span>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default App;

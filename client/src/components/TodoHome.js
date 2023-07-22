import React, {useState, useEffect} from "react";
import axios from "axios";

const TodoHomePage = () => {
  const [todos, setTodos] = useState([]);

  const [newTodoText, setNewTodoText] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/todo");
        const data = response.data;
        console.log(data);
        const updatedTodos = data.map((todoItem) => {
          return {
            id: todoItem._id,
            todo: todoItem.todo,
            completed: todoItem.completed,
          };
        });
        setTodos(updatedTodos);
      } catch (error) {
        console.error("Error fetching todos:", error.message);
      }
    };
    fetchTodos();
  }, []);

  const handleDelete = (todoId) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleEdit = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, editable: true};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleSave = (todoId, newText) => {
    const trimmedText = newText.trim();
    if (trimmedText.length === 0) {
      handleCancel(todoId);
      return;
    }

    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, todo: trimmedText, editable: false};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleCancel = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, editable: false};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleInputChange = (todoId, newText) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, todo: newText};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleKeyDown = (event, todoId, newText) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(todoId, newText);
    }
  };

  const handleToggleComplete = (todoId) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {...todo, completed: !todo.completed};
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleAddTodo = () => {
    const trimmedText = newTodoText.trim();
    if (trimmedText.length === 0) {
      return; // Don't add an empty todo
    }

    const newTodo = {
      id: todos.length + 1, // You can use a more robust method for generating unique IDs
      todo: trimmedText,
      completed: false,
      editable: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  return (
    <div className="container">
      <h2>Todo List</h2>
      <div className="add-todo">
        <input
          className="inside-add-todo"
          type="todo"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <div className="todo-actions">
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
      {todos.length === 0 ? <h2>Empty</h2> : null}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item  ${todo.completed ? "completed" : ""}`}>
            {todo.editable ? (
              <input
                className="inside-add-todo"
                type="todo"
                value={todo.todo}
                onChange={(e) => handleInputChange(todo.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo.id, todo.todo)}
              />
            ) : (
              <span>{todo.todo}</span>
            )}
            <div className="todo-actions">
              {todo.editable ? (
                <>
                  <div className="save-cancel">
                    <button onClick={() => handleSave(todo.id, todo.todo)}>
                      Save
                    </button>
                    <button onClick={() => handleCancel(todo.id)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button onClick={() => handleDelete(todo.id)}>Delete</button>
                  <button onClick={() => handleEdit(todo.id)}>Edit</button>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleComplete(todo.id)}
                  />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoHomePage;

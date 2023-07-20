import React, {useState, useEffect} from "react";

const TodoHomePage = () => {
  const [todos, setTodos] = useState([
    {id: 1, text: "Buy groceries", completed: false, editable: false},
    {id: 2, text: "Finish homework", completed: true, editable: false},
    {id: 3, text: "Walk the dog", completed: false, editable: false},
  ]);

  const [newTodoText, setNewTodoText] = useState("");

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8000/api/todo");
  //       const data = await response.json();
  //       const updatedTodos = data.map((todoItem) => {
  //         return {
  //           id: todoItem._id,
  //           text: todoItem.todo,
  //           completed: todoItem.completed,
  //           editable: false,
  //         };
  //       });
  
  //       setTodos(updatedTodos);
  //     } catch (error) {
  //       console.error("Error fetching todos:", error.message);
  //     }
  //   };
  
  //   fetchTodos();
  // }, []);

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
        return {...todo, text: trimmedText, editable: false};
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
        return {...todo, text: newText};
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
      text: trimmedText,
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
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <div className="todo-actions">
          <button onClick={handleAddTodo}>Add</button>
        </div>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-item ${todo.completed ? "completed" : ""}`}>
            {todo.editable ? (
              <input
                type="text"
                value={todo.text}
                onChange={(e) => handleInputChange(todo.id, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, todo.id, todo.text)}
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <div className="todo-actions">
              {todo.editable ? (
                <>
                  <div className="save-cancel">
                    <button onClick={() => handleSave(todo.id, todo.text)}>
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

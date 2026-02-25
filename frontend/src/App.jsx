// import { useState } from "react";
// import "./App.css";


// function App() {
//   const [todos, setTodos] = useState([]);
//   const [input, setInput] = useState("");

//   const addTodo = () => {
//     if (!input.trim()) return;

//     const newTodo = {
//       id: Date.now(),
//       title: input,
//       completed: false
//     };

//     setTodos([...todos, newTodo]);
//     setInput("");
//   };


//   const toggleTodo = (id) => {
//     const updatedTodos = todos.map((todo) =>
//       todo.id === id
//         ? { ...todo, completed: !todo.completed }
//         : todo
//     );

//     setTodos(updatedTodos);
//   };

//   const deleteTodo = (id) => {
//     const filteredTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(filteredTodos);
//   };

//   return (
//     <div className="container">
//       <h1>To Do App</h1>

//       <div className="input-group">
//         <input
//           type="text"
//           placeholder="What needs to be done?"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") addTodo();
//           }}
//         />
//         <button onClick={addTodo}>Add Task</button>
//       </div>

//       <ul id="todoList">
//         {todos.map((todo) => (
//           <li
//             key={todo.id}
//             className={todo.completed ? "completed" : ""}
//           >
//             <span>{todo.title}</span>
//             <div>
//               <button onClick={() => toggleTodo(todo.id)}>
//                 ✔
//               </button>
//               <button onClick={() => deleteTodo(todo.id)}>
//                 ❌
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;


import "./App.css";
import { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodoApi
} from "./api/todoApi";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async () => {
    if (!input.trim()) return;

    try {
      const newTodo = await createTodo(input);
      setTodos([newTodo, ...todos]);
      setInput("");
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      const updated = await updateTodo(todo._id, {
        completed: !todo.completed
      });

      setTodos(todos.map(t => t._id === updated._id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await deleteTodoApi(id);
      setTodos(todos.filter(t => t._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  // ... (imports remain the same)

  return (
    <div className="container">
      <h1>To Do App</h1>

      <div className="input-group">
        <input
          placeholder="What needs to be done?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span className={`todo-text ${todo.completed ? "completed-task" : ""}`}>
              {todo.title}
            </span>

            <div className="actions">
              <button className="btn-toggle" onClick={() => toggleTodo(todo)}>
                {todo.completed ? "↩" : "✓"}
              </button>
              <button className="btn-delete" onClick={() => deleteTodo(todo._id)}>
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
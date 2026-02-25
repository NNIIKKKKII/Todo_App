// const addTodo = () => {
//     if (!input.trim()) return;

//     const newTodo = {
//         id: Date.now(),
//         title: input,
//         completed: false
//     };

//     setTodos([...todos, newTodo]);
//     setInput("");
// };

<ul id="todoList">
    {todos.map((todo) => (
        <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
        >
            <span>{todo.title}</span>
            <div>
                <button onClick={() => toggleTodo(todo.id)}>
                    ✔
                </button>
                <button onClick={() => deleteTodo(todo.id)}>
                    ❌
                </button>
            </div>
        </li>
    ))}
</ul>
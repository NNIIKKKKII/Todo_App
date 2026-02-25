// const BASE_URL = "http://localhost:3000/api/todos";

// // GET ALL TODOS
// export const getTodos = async () => {
//     const response = await fetch(BASE_URL);
//     return response.json();
// };

// // CREATE TODO
// export const createTodo = async (title) => {
//     const response = await fetch(BASE_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ title })
//     });

//     return response.json();
// };

// // UPDATE TODO
// export const updateTodo = async (id) => {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//         method: "PUT"
//     });

//     return response.json();
// };

// // DELETE TODO
// export const deleteTodoApi = async (id) => {
//     await fetch(`${BASE_URL}/${id}`, {
//         method: "DELETE"
//     });
// };


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/todos";


const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }
    return response.json();
};

// GET ALL
export const getTodos = async () => {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
};

// CREATE
export const createTodo = async (title) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    return handleResponse(response);

};

// UPDATE
export const updateTodo = async (id, updates) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
    });
    return handleResponse(response);
};

// DELETE
export const deleteTodoApi = async (id) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
    return handleResponse(response);
};
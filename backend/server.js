

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import cors from "cors";


const app = express();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;


// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cors());

// ------------------
// __dirname Fix (ESM)
// ------------------


// ------------------
// MongoDB Connection
// ------------------
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // stop server if DB fails
    });
// ------------------
// Schema & Model
// ------------------
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const Todo = mongoose.model("Todo", todoSchema);

// ------------------
// ROUTES
// ------------------

// READ ALL
app.get("/api/todos", async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// CREATE
app.post("/api/todos", async (req, res) => {
    try {
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newTodo = await Todo.create({ title: title.trim() });
        res.status(201).json(newTodo);

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// UPDATE (toggle or custom update)
app.put("/api/todos/:id", async (req, res) => {
    try {
        const { title, completed } = req.body;

        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({ message: "Title cannot be empty" });
            }
            todo.title = title.trim();
        }

        if (completed !== undefined) {
            todo.completed = completed;
        }

        await todo.save();
        res.json(todo);

    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
});

// DELETE
app.delete("/api/todos/:id", async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Deleted successfully" });

    } catch (error) {
        res.status(400).json({ message: "Invalid ID" });
    }
});

// ------------------
// SERVER START
// ------------------

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});




// import dotenv from "dotenv";
// dotenv.config();

// import mongoose from "mongoose";

// mongoose.connect(process.env.MONGO_URI)
//     .then(() => console.log("MongoDB Atlas Connected"))
//     .catch(err => console.log(err));


// import express from "express";
// // import andre togondu eli hakudu
// import path from "path";
// // PATH package.JSON DENDE BARAE
// import { fileURLToPath } from "url";
// // fileURLToPath package.json ninda barate



// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// const app = express();
// app.use(express.json());
// // express.json converts js oBjs into json
// // use express nali ede

// // Serve frontend
// app.use(express.static(path.join(__dirname, "public")));




// // In-memory array
// let todos = [];
// let nextId = 1;

// /*
//   CREATE
// */

// // req user does it
// // res we the programmer do it
// app.post("/api/todos", (req, res) => {
//     const { title } = req.body;


//     if (!title) {
//         return res.status(400).json({ message: "Title is required" });
//     }
//     // 400 user threadCpuUsage, tilte tappa ede

//     const newTodo = {
//         id: nextId++,
//         title,
//         completed: false
//     };

//     todos.push(newTodo);
//     res.status(201).json(newTodo);
// });

// /*
//   READ ALL
// */
// app.get("/api/todos", (req, res) => {
//     res.json(todos);
// });

// /*
//   UPDATE
// */



// // parseInt convert string into number
// app.put("/api/todos/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     const todo = todos.find(t => t.id === id);
//     // in todos , it finds 1 from todos arrays [ 2, 3, 4]

//     if (!todo) {
//         return res.status(404).json({ message: "Not found" });
//     }

//     todo.completed = !todo.completed;
//     // !todo.completed means if todo.completed is true then it will be false and if todo.completed is false then it will be true
//     res.json(todo);
// });

// /*
//   DELETE
// */
// app.delete("/api/todos/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     todos = todos.filter(t => t.id !== id);
//     res.json({ message: "Deleted" });
// });

// app.listen(3000, () => {
//     console.log("Server running at http://localhost:3000");
// });


// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import path from "path";
// import { fileURLToPath } from "url";
// import mongoose from "mongoose";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// const app = express();
// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));




// mongoose.connect(process.env.MONGO_URL)
//   .then(() => console.log("MongoDB Atlas Connected"))
//   .catch(err => console.log(err));





// /*
// ============================
// CONNECT TO MONGODB ATLAS
// ============================
// */

// // mongoose.connect("YOUR_ATLAS_CONNECTION_STRING")
// //   .then(() => console.log("MongoDB Atlas Connected"))
// //   .catch(err => console.log(err));

// /*
// ============================
// CREATE SCHEMA
// ============================
// */

// const todoSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   completed: {
//     type: Boolean,
//     default: false
//   }
// });

// const Todo = mongoose.model("Todo", todoSchema);

// /*
// ============================
// CRUD OPERATIONS
// ============================
// */



// // READ ALL
// app.get("/api/todos", async (req, res) => {
//   const todos = await Todo.find();
//   res.json(todos);
// });



// // CREATE
// app.post("/api/todos", async (req, res) => {
//   try {
//     const newTodo = await Todo.create({
//       title: req.body.title
//     });

//     res.status(201).json(newTodo);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// // UPDATE
// app.put("/api/todos/:id", async (req, res) => {
//   try {
//     const updated = await Todo.findByIdAndUpdate(
//       req.params.id,
//       { $set: { completed: true } },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Not found" });
//     }

//     res.json(updated);
//   } catch (error) {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// });

// // DELETE
// app.delete("/api/todos/:id", async (req, res) => {
//   try {
//     await Todo.findByIdAndDelete(req.params.id);
//     res.json({ message: "Deleted" });
//   } catch (error) {
//     res.status(400).json({ message: "Invalid ID" });
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running at http://localhost:3000");

// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const {
    createBlog,
    getBlogs,
    updateBlog,
    deleteBlog
} = require("./controller");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "mongodb://127.0.0.1:27017/blogcrud"
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Blog CRUD API Running");
});

app.post("/blogs", createBlog);
app.get("/blogs", getBlogs);
app.put("/blogs/:id", updateBlog);
app.delete("/blogs/:id", deleteBlog);

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});
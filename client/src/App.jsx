import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:5000/blogs");
            setBlogs(res.data);

            if (res.data.length > 0 && !selectedBlog) {
                setSelectedBlog(res.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addBlog = async () => {
        if (!title || !content) {
            alert("Please fill all fields");
            return;
        }

        try {
            await axios.post("http://localhost:5000/blogs", {
                title,
                content
            });

            setTitle("");
            setContent("");

            fetchBlogs();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/blogs/${id}`);

            setSelectedBlog(null);

            fetchBlogs();
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    return (
        <div className="container">

            <h1 className="title">
                BLOG SYSTEM
            </h1>

            <p className="subtitle">
                Neural Content Management Interface v1.0
            </p>

            <div className="status">
                ● MongoDB Connected | Express API Active
            </div>

            <div className="dashboard">

                {/* LEFT SIDEBAR */}

                <div className="sidebar">

                    <h3>📂 BLOG DATABASE</h3>

                    {blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className={`blog-item ${
                                selectedBlog?._id === blog._id
                                    ? "active-blog"
                                    : ""
                            }`}
                            onClick={() => setSelectedBlog(blog)}
                        >
                            {blog.title}
                        </div>
                    ))}

                </div>

                {/* CENTER FORM */}

                <div className="form-box">

                    <h2>CREATE NEW ENTRY</h2>

                    <input
                        type="text"
                        placeholder="Enter Blog Title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <textarea
                        placeholder="Enter Blog Content..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="6"
                    />

                    <button
                        className="btn"
                        onClick={addBlog}
                    >
                        DEPLOY BLOG
                    </button>

                </div>

                {/* RIGHT VIEWER */}

                <div className="viewer">

                    <h2>BLOG VIEWER</h2>

                    {selectedBlog ? (
                        <>
                            <h3>{selectedBlog.title}</h3>

                            <p>
                                {selectedBlog.content}
                            </p>

                            <button
                                className="delete-btn"
                                onClick={() =>
                                    deleteBlog(
                                        selectedBlog._id
                                    )
                                }
                            >
                                DELETE RECORD
                            </button>
                        </>
                    ) : (
                        <p>
                            Select a blog from the
                            sidebar
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default App;
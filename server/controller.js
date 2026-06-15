const Blog = require("./schema");

// Create Blog
exports.createBlog = async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Read Blogs
exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(blog);
    } catch (error) {
        res.status(500).json(error);
    }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog Deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
};
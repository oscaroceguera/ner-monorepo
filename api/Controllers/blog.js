const Blog = require("../Models/blog");

exports.getBlogs = (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs));
};

exports.addBlogs = (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json({ result });
  });
};

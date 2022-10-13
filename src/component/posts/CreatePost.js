import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/posts";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const storePost = async (e) => {
    e.preventDefault();
    await axios.post(endpoint, {
      title: title,
      tags: tags,
      description: description,
    });
    // console.log()
    navigate("/posts");
  };
  console.log(storePost);

  return (
    <div className="container">
      <h3>Create Post</h3>
      <form onSubmit={storePost}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Type Title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="form-control"
            placeholder="Type tags"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Type description"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Store
        </button>
      </form>
    </div>
  );
};

export default CreatePost;

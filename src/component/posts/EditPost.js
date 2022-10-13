import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/posts/";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  //Update function here
  const Update = async (e) => {
    e.preventDefault();
    await axios.put(`${endpoint}${id}`, {
      description: description,
      title: title,
      tags: tags,
    });
    navigate("/posts");
  };
  //   console.log(Update);

  //Call a single Post data
  useEffect(() => {
    const getSinglePost = async () => {
      const response = await axios.get(`${endpoint}${id}`);
      setTitle(response.data.data.title);
      setTags(response.data.data.tags);
      setDescription(response.data.data.description);

      console.log(response.data);
    };
    getSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <h3>Create Post</h3>
      <form onSubmit={Update}>
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;

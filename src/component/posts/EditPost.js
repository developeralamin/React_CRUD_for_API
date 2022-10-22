import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/posts/";

const EditPost = () => {
  const [isLoading, setIsloading] = useState(false);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  //Update function here
  const Update = async (e) => {
    setIsloading(true);
    e.preventDefault();
    await axios.put(`${endpoint}${id}`, {
      title: title,
      tags: tags,
      description: description,
    });
    setIsloading(false);
    navigate("/posts");
  };

  //Call a single Post data
  useEffect(() => {
    getSinglePost();
  }, []);

  const getSinglePost = async () => {
    setIsloading(true);
    const response = await axios.get(`${endpoint}${id}`);
    setTitle(response.data.data.title);
    setTags(response.data.data.tags);
    setDescription(response.data.data.description);
    setIsloading(false);

    console.log(response.data);
  };

  return (
    <div className="container">
      <h3>Update Post</h3>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
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
            <label className="form-label">Description</label>
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
      )}
    </div>
  );
};

export default EditPost;

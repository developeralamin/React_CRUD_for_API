import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/posts";

const CreatePost = () => {
  const navigate = useNavigate();
  const [isLoading, setIsloadaing] = useState(false);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");

  //catch validation errors
  const [errors, setErrors] = useState({});

  // console.log(errors);
  // const errors: {}
  const storePost = async (e) => {
    setIsloadaing(true);
    e.preventDefault();
    const response = await axios
      .post(endpoint, {
        title: title,
        tags: tags,
        description: description,
      })
      .catch((error) => {
        setErrors(error.response.data.errorMsg);
        console.log("test__00", error.response.data.errorMsg);
      });
    setIsloadaing(false);
  };

  return (
    <div className="container">
      <h3>Create Post</h3>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <form onSubmit={storePost}>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Type Title"
            />
          </div>

          {errors?.title && <p style={{ color: "red" }}>{errors.title[0]}</p>}

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
            Store
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;

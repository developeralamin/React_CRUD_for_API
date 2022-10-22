import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//api base url
const endpoint = "http://127.0.0.1:8000/api";
const endpointLesson = "http://127.0.0.1:8000/api/lesson";

const CreateLesson = () => {
  //all posts
  const [posts, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //create lesson
  const [title, settitle] = useState("");
  const [post_id, setPostId] = useState("");
  const [video_url, setvideo_url] = useState("");
  const [description, setdescription] = useState("");

  const navigate = useNavigate();

  //store a lesson
  const storeLesson = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await axios.post(endpointLesson, {
      title: title,
      post_id: post_id,
      video_url: video_url,
      description: description,
    });
    setIsLoading(false);
    navigate("/lessons");
  };

  //get posts
  useEffect(() => {
    getAllPosts();
  }, []);
  // get All Post
  const getAllPosts = async () => {
    try {
      await axios.get(`${endpoint}/posts`).then((response) => {
        setPost(response.data.data.data);
        console.log(response.data.data);
      });
    } catch (error) {}
  };

  return (
    <div className="container">
      <h3>Create Lesson</h3>
      {isLoading ? (
        <h1 style={{ textAlign: "center" }}>Loading......</h1>
      ) : (
        <form onSubmit={storeLesson}>
          <div className="mb-3">
            <label className="form-label">Course Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              className="form-control"
              placeholder="Type Course Title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Posts</label>
            <select
              className="form-select"
              value={post_id}
              onChange={(e) => setPostId(e.target.value)}
              aria-label="Default select example"
            >
              <option>Select Post</option>
              {posts.map((post) => {
                return (
                  <option key={post} value={post.id}>
                    {post.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Video Link</label>
            <input
              type="text"
              value={video_url}
              onChange={(e) => {
                setvideo_url(e.target.value);
              }}
              className="form-control"
              placeholder="Course link"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              type="text"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
              className="form-control"
              placeholder="Type Description"
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

export default CreateLesson;

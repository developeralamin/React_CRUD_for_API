import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/lesson/";
const endpointPost = "http://127.0.0.1:8000/api/posts";

const EditLesson = () => {
  const [isLoading, setIsloading] = useState(false);
  //get all post cause of it is forigen key
  const [posts, setPost] = useState([]);

  const [post_id, setPostId] = useState("");
  const [title, settitle] = useState();
  const [video_url, setvideo_url] = useState();
  const [description, setdescription] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  //update product
  const Update = async (e) => {
    setIsloading(true);
    e.preventDefault();
    await axios
      .put(`${endpoint}${id}`, {
        title: title,
        post_id: post_id,
        video_url: video_url,
        description: description,
      })
      .catch((error) => {
        setErrors(error.response.data.errorMsg);
        console.log(error.response.data.errorMsg);
      });
    setIsloading(false);
    // navigate("/lessons");
  };

  console.log(Update);
  //show data in input field
  useEffect(() => {
    getSinlgeLesson();
    getAllPosts();
  }, []);

  const getSinlgeLesson = async () => {
    setIsloading(true);
    const response = await axios.get(`${endpoint}${id}`);
    settitle(response.data.data.title);
    setPostId(response.data.data.post_id);
    setvideo_url(response.data.data.video_url);
    setdescription(response.data.data.description);
    setIsloading(false);
    console.log(response.data);
  };

  //get All Post here from API
  const getAllPosts = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(`${endpointPost}`);
      setPost(response.data.data.data);
      setIsloading(false);
      console.log(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h3>Update Lesson</h3>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <form onSubmit={Update}>
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

          {errors?.title && <p style={{ color: "red" }}>{errors.title[0]}</p>}

          <div className="mb-3">
            <label className="form-label">Posts Title</label>
            <select
              class="form-select"
              value={post_id}
              onChange={(e) => setPostId(e.target.value)}
              aria-label="Default select example"
            >
              {/* <option>Select Post</option> */}
              {posts.map((post, index) => {
                return (
                  <option key={index.id} value={post.id}>
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
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditLesson;

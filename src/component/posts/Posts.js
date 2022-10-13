import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Posts = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  //get All Post here from API
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${endpoint}/posts`);
      setData(response.data.data);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //delete post
  const deletePost = async (id) => {
    await axios.delete(`${endpoint}/posts/${id}`);
    getAllPosts();
  };

  return (
    <div className="container">
      <div className="mr-2 float-right">
        <Link to="/create" className="btn btn-success btn-lg float-left mt-2 mb-2 text-white">
          Create
        </Link>
      </div>

      <Table striped bordered hover size="sm">
        <thead className="bg-primary text-white">
          <tr>
            <th>Title</th>
            <th>Tags</th>
            {/* <th>Description</th> */}
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <h1 className="text-center">Loading......</h1>
        ) : (
          <tbody>
            {data.map((post) => (
              <tr key={post.id}>
                <td> {post.title} </td>
                <td> {post.tags} </td>
                {/* <td> {post.description} </td> */}
                <td>
                  <Link to={`/show/${post.id}`} className="btn btn-primary">
                    View
                  </Link>
                  <Link to={`/edit/${post.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button onClick={() => deletePost(post.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default Posts;

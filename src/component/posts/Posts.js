import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Posts = () => {
  const [posts, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  //get All Post here from API
  const getAllPosts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`${endpoint}/posts?page=${pageNumber}`);
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
            {posts?.data?.map((post) => (
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
      {posts?.total > 5 && (
        <Pagination
          activePage={posts?.current_page ? posts?.current_page : 0}
          itemsCountPerPage={posts?.per_page ? posts?.per_page : 0}
          totalItemsCount={posts?.total ? posts?.total : 0}
          onChange={(pageNumber) => {
            getAllPosts(pageNumber);
          }}
          pageRangeDisplayed={8}
          itemClass="page-item"
          linkClass="page-link"
          itemClassFirst="p-first-page-link"
          itemClassLast="p-last-page-link"
          activeClass="p-active"
          activeLinkClass="p-active-link"
          firstPageText="First Page"
          lastPageText="Last Lage"
        />
      )}
    </div>
  );
};

export default Posts;

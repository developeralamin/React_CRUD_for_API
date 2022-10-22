import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
//pagination
import Pagination from "react-js-pagination";
//sweetAlert
import Swal from "sweetalert2";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Posts = () => {
  const [posts, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  //Load all post here
  useEffect(() => {
    getAllPosts();
  }, []);

  //get All Post here from API
  const getAllPosts = async (pageNumber = 1) => {
    setLoading(true);
    try {
      await axios.get(`${endpoint}/posts?page=${pageNumber}`).then((res) => {
        setData(res.data.data);
        setLoading(false);
        console.log(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete a post
  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${endpoint}/posts/${id}`).then((res) => {
          Swal.fire("Deleted!", "success");
          // reload-load posts
          // let index = posts.indexOf(id);
          // posts.splice(index, 1);
          getAllPosts();
        });
      }
    });
  };

  return (
    <div className="container">
      <div className="mr-2 float-right">
        <Link to="/create" className="btn btn-success btn-lg float-left mt-2 mb-2 text-white">
          Create
        </Link>
      </div>

      <Table>
        <thead className="bg-primary text-white">
          <tr>
            <th>Title</th>
            <th>Tags</th>
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
                <td>
                  <Link to={`/show/${post.id}`} className="btn  btn-sm  btn-primary">
                    View
                  </Link>
                  <Link to={`/edit/${post.id}`} className="btn  btn-sm btn-warning">
                    Edit
                  </Link>
                  <button onClick={() => deletePost(post.id)} className="btn btn-sm  btn-danger">
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

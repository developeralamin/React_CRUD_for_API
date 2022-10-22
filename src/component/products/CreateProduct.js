import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/product";
const endpointPost = "http://127.0.0.1:8000/api/posts";

const CreateProduct = () => {
  //get all post cause of it is forigen key
  const [posts, setPost] = useState([]);
  const [isLoading, setIsloadaing] = useState(false);

  const [name, setName] = useState("");
  const [post_id, setPostId] = useState("");
  const [sale_price, setSalePrice] = useState("");
  const [cost_price, setCostPrice] = useState("");

  const navigate = useNavigate();

  const storeProduct = async (e) => {
    setIsloadaing(true);
    e.preventDefault();
    await axios.post(endpoint, {
      name: name,
      post_id: post_id,
      sale_price: sale_price,
      cost_price: cost_price,
    });
    setIsloadaing(false);
    navigate("/products");
  };

  console.log(storeProduct);
  //show post
  useEffect(() => {
    getAllPosts();
  }, []);

  //get All Post here from API
  const getAllPosts = async () => {
    try {
      const response = await axios.get(`${endpointPost}`);
      setPost(response.data.data.data);
      console.log(response.data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(storeProduct);
  console.log("getAllPosts", getAllPosts);

  return (
    <div className="container">
      <h3>Create Products</h3>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <form onSubmit={storeProduct}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Type name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Sale Price</label>
            <input
              type="text"
              value={sale_price}
              onChange={(e) => setSalePrice(e.target.value)}
              className="form-control"
              placeholder="Type sale price"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Cost Price</label>
            <textarea
              value={cost_price}
              onChange={(e) => setCostPrice(e.target.value)}
              type="text"
              className="form-control"
              placeholder="Type cost price"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Posts</label>
            <select
              class="form-select"
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
          <button type="submit" className="btn btn-primary">
            Store
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateProduct;

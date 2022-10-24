import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/product/";
const endpointPost = "http://127.0.0.1:8000/api/posts";

const EditProduct = () => {
  const [isLoading, setIsloading] = useState(false);
  //get all post cause of it is forigen key
  const [posts, setPost] = useState([]);

  const [name, setName] = useState("");
  const [post_id, setPostId] = useState("");
  const [sale_price, setSalePrice] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  //update product
  const Update = async (e) => {
    // setIsloading(true);
    e.preventDefault();
    await axios
      .put(`${endpoint}${id}`, {
        name: name,
        post_id: post_id,
        sale_price: sale_price,
        cost_price: cost_price,
      })
      .catch((error) => {
        setErrors(error.response.data.errorMsg);
        console.log(error.response.data.errorMsg);
      });
    setIsloading(false);
    // navigate("/products");
  };

  //show data in input field
  useEffect(() => {
    getSinlgProduct();
    getAllPosts();
  }, []);

  const getSinlgProduct = async () => {
    setIsloading(true);
    const response = await axios.get(`${endpoint}${id}`);
    setName(response.data.data.name);
    setPostId(response.data.data.post_id);
    setSalePrice(response.data.data.sale_price);
    setCostPrice(response.data.data.cost_price);
    setIsloading(false);
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
      <h3>Update Products</h3>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <form onSubmit={Update}>
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

          {errors?.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}

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
                  <option key={post.id} value={post.id}>
                    {post.title}
                  </option>
                );
              })}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;

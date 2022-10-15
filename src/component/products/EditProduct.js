import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

//api base url
const endpoint = "http://127.0.0.1:8000/api/product/";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [sale_price, setSalePrice] = useState("");
  const [cost_price, setCostPrice] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //update product
  const Update = async (e) => {
    e.preventDefault();
    await axios.put(`${endpoint}${id}`, {
      name: name,
      sale_price: sale_price,
      cost_price: cost_price,
    });
    navigate("/products");
  };

  console.log(Update);

  //show data in input field
  useEffect(() => {
    const getSinlgProduct = async () => {
      const response = await axios.get(`${endpoint}${id}`);
      setName(response.data.data.name);
      setSalePrice(response.data.data.sale_price);
      setCostPrice(response.data.data.cost_price);
    };
    getSinlgProduct();
  }, []);

  return (
    <div className="container">
      <h3>Create Products</h3>
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
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditProduct;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    allProducts();
  }, []);

  //get all products
  const allProducts = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(`${endpoint}/product`);
      setData(response.data.data);
      setIsloading(false);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  //   delete product item
  const deleteproduct = async (id) => {
    await axios.delete(`${endpoint}/product/${id}`);
    allProducts();
  };
  return (
    <div className="container">
      <div className="mr-2 float-right">
        <Link
          to="/createProduct"
          className="btn btn-success btn-lg float-left mt-2 mb-2 text-white"
        >
          Create
        </Link>
      </div>

      <Table striped bordered hover size="sm">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Post</th>
            <th>Sale Price</th>
            <th>Cost Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <h1 className="text-center">Loading......</h1>
        ) : (
          <tbody>
            {data.map((product) => (
              <tr key={product.id}>
                <td> {product.name} </td>
                <td> {product.post} </td>
                <td> {product.sale_price} </td>
                <td> {product.cost_price} </td>

                <td>
                  <Link to={`/editproduct/${product.id}`} className="btn btn-warning">
                    Edit
                  </Link>
                  <button className="btn btn-danger" onClick={() => deleteproduct(product.id)}>
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

export default Products;

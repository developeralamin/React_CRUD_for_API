import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Products = () => {
  const [products, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    allProducts();
  }, []);

  //get all products
  const allProducts = async (pageNumber = 1) => {
    setIsloading(true);
    try {
      const response = await axios.get(`${endpoint}/product?page=${pageNumber}`);
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
            <th>Post Title</th>
            <th>Sale Price</th>
            <th>Cost Price</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <h1 className="text-center">Loading......</h1>
        ) : (
          <tbody>
            {products?.data?.map((product) => (
              <tr key={product.id}>
                <td> {product.name} </td>
                <td> {product?.post?.title} </td>
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

      {products?.total > 5 && (
        <Pagination
          activePage={products?.current_page ? products?.current_page : 0}
          itemsCountPerPage={products?.per_page ? products?.per_page : 0}
          totalItemsCount={products?.total ? products?.total : 0}
          onChange={(pageNumber) => {
            allProducts(pageNumber);
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

export default Products;

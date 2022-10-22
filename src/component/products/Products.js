import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
//sweetAlert
import Swal from "sweetalert2";

//api base url
const endpoint = "http://127.0.0.1:8000/api";

const Products = () => {
  const [products, setData] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  //Load all Products
  useEffect(() => {
    allProducts();
  }, []);

  //get all products
  const allProducts = async (pageNumber = 1) => {
    setIsloading(true);
    try {
      await axios.get(`${endpoint}/product?page=${pageNumber}`).then((response) => {
        setData(response.data.data);
        setIsloading(false);
        console.log(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //   delete product item
  const deleteproduct = (id) => {
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
        axios.delete(`${endpoint}/product/${id}`).then((res) => {
          Swal.fire("Deleted!", "success");
          // reload-load product
          // let index = product.indexOf(id);
          // product.splice(index, 1);
          allProducts();
        });
      }
    });
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
                  <Link to={`/editproduct/${product.id}`} className="btn btn-sm btn-warning">
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteproduct(product.id)}
                  >
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

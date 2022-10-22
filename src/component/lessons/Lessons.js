import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
//pagination
import Pagination from "react-js-pagination";
//api base url
const endpoint = "http://127.0.0.1:8000/api/lesson";

const Lessons = () => {
  const [lessons, setLesson] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    allLesson();
  }, []);

  //allLesson
  const allLesson = async (pageNumber = 1) => {
    setIsLoading(true);
    try {
      await axios.get(`${endpoint}?page=${pageNumber}`).then((res) => {
        setLesson(res.data.data);
        setIsLoading(false);
        console.log(res.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete lesson
  const deleteLesson = (id) => {
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
        axios
          .delete(`${endpoint}/${id}`)
          .then((response) => {
            Swal.fire("Deleted!", "success");
            allLesson();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  return (
    <div className="container">
      <div className="mr-2 float-right">
        <Link to="/CreateLesson" className="btn btn-success btn-lg float-left mt-2 mb-2 text-white">
          Create
        </Link>
      </div>

      <Table>
        <thead className="bg-primary text-white">
          <tr>
            <th>Course Title</th>
            <th>Post Title</th>
            <th>Action</th>
          </tr>
        </thead>
        {isLoading ? (
          <h1 style={{ textAlign: "center" }}>Loading......</h1>
        ) : (
          <tbody>
            {lessons?.data?.map((lesson) => (
              <tr key={lesson.id}>
                <td> {lesson.title} </td>
                <td> {lesson?.post?.title} </td>
                <td>
                  <Link to={`/showLesson/${lesson.id}`} className="btn btn-sm  btn-success">
                    View
                  </Link>
                  <Link to={`/editLesson/${lesson.id}`} className="btn btn-sm  btn-primary">
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteLesson(lesson.id)}
                    className="btn btn-sm  btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </Table>
      {lessons?.total > 5 && (
        <Pagination
          activePage={lessons?.current_page ? lessons?.current_page : 0}
          itemsCountPerPage={lessons?.per_page ? lessons?.per_page : 0}
          totalItemsCount={lessons?.total ? lessons?.total : 0}
          onChange={(pageNumber) => {
            allLesson(pageNumber);
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

export default Lessons;

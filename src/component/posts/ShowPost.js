import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
//api base url
const endpoint = "http://127.0.0.1:8000/api/posts/";

const ShowPost = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  //Call a single Post data
  useEffect(() => {
    setLoading(true);
    const getSinglePost = async () => {
      const response = await axios.get(`${endpoint}${id}`);
      setTitle(response.data.data.title);
      setTags(response.data.data.tags);
      setDescription(response.data.data.description);
      setLoading(false);
      console.log(response.data);
    };
    getSinglePost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      <div className="mr-2 float-right">
        <Button
          onClick={() => navigate("/posts")}
          className="btn btn-success btn-lg float-left mt-2 mb-2 text-white"
        >
          Posts
        </Button>
      </div>

      <Table striped bordered hover size="sm">
        {isLoading ? (
          <h1 className="text-center">Loading......</h1>
        ) : (
          <tbody style={{ textAlign: "center" }}>
            <p> {title} </p>
            <p> {tags} </p>
            <p> {description} </p>
            <td></td>
          </tbody>
        )}
      </Table>
    </div>
  );
};

export default ShowPost;

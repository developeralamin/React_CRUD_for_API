import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { Card } from "react-bootstrap";
//api base url
const endpoint = "http://127.0.0.1:8000/api";

const ShowLesson = () => {
  const [title, setTitle] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [post_title, setPost] = useState("");
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    singleLesson();
  }, []);

  const singleLesson = async () => {
    setIsLoading(true);
    await axios
      .get(`${endpoint}/lesson/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setDescription(response.data.data.description);
        setVideoUrl(response.data.data.video_url);
        setPost(response.data.data.post_title);
        setIsLoading(false);
        console.log(response.data.data.title);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {isLoading ? (
        <h1 className="text-center">Loading......</h1>
      ) : (
        <Card style={{ margin: "0 auto" }}>
          <tbody style={{ textAlign: "center", color: "green" }}>
            <p> {title} </p>
            <p> {description} </p>
            <p> {post_title} </p>
            <iframe
              class="embed-responsive-item embed-item"
              src={video_url}
              allowfullscreen
            ></iframe>
            <td></td>
          </tbody>
        </Card>
      )}
    </div>
  );
};

export default ShowLesson;

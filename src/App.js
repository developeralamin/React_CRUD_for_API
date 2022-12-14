import ShowData from "../src/component/ShowData";
// posts component
import Posts from "../src/component/posts/Posts";
import EditPost from "../src/component/posts/EditPost";
import ShowPost from "../src/component/posts/ShowPost";
import CreatePost from "../src/component/posts/CreatePost";
// products component
import Products from "../src/component/products/Products";
import CreateProduct from "../src/component/products/CreateProduct";
import EditProduct from "../src/component/products/EditProduct";
// lessons component
import Lessons from "../src/component/lessons/Lessons";
import ShowLesson from "../src/component/lessons/ShowLesson";
import EditLesson from "../src/component/lessons/EditLesson";
import CreateLesson from "../src/component/lessons/CreateLesson";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <br />
      <h4 style={{ textAlign: "center" }}>:)Finally Create CRUD React with Laravel(:</h4>
      <br />

      <Routes>
        <Route path="/" element={<ShowData />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/show/:id" element={<ShowPost />} />
        <Route path="/products" element={<Products />} />
        <Route path="/createProduct" element={<CreateProduct />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/CreateLesson" element={<CreateLesson />} />
        <Route path="/showLesson/:id" element={<ShowLesson />} />
        <Route path="/editLesson/:id" element={<EditLesson />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

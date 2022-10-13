import ShowData from "../src/component/ShowData";
import Posts from "../src/component/posts/Posts";
import EditPost from "../src/component/posts/EditPost";
import ShowPost from "../src/component/posts/ShowPost";
import CreatePost from "../src/component/posts/CreatePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>:)Finally Creat CRUD React with Laravel(:</h2>

      <Routes>
        <Route path="/" element={<ShowData />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/show/:id" element={<ShowPost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

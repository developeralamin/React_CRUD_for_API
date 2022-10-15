import * as React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" end className="nav-link">
        Home
      </NavLink>

      <NavLink to="/posts" className="nav-link">
        Posts
      </NavLink>
      <NavLink to="/products" className="nav-link">
        Products
      </NavLink>
    </nav>
  );
};

export default Navbar;

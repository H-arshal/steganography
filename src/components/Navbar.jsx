import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link to="/encode" className={location.pathname === "/encode" ? "active" : ""}>
              Encode
            </Link>
          </li>
          <li>
            <Link to="/decode" className={location.pathname === "/decode" ? "active" : ""}>
              Decode
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

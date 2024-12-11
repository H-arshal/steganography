import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState("/encode");

  const handleClick = (page) => {
    setActive(page);
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            <Link
              to="/encode"
              className={active === "/encode" ? "active" : ""}
              onClick={() => handleClick("/encode")}
            >
              Encode
            </Link>
          </li>
          <li>
            <Link
              to="/decode"
              className={active === "/decode" ? "active" : ""}
              onClick={() => handleClick("/decode")}
            >
              Decode
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

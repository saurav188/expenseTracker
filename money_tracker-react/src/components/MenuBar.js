import React from "react";
import { Link, useLocation } from "react-router-dom";

function MenuBar({name, icon, path}) {
  const { pathname } = useLocation();
  return ( 
    <li className={`nav-item  ${ pathname === path && 'active' }`}>
        {/* <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a> */}
        <Link
        type="button"
        to={path}
        className={`nav-link d-flex justify-content-center`}
        >
            <p>{ name }</p>
        </Link>
    </li>
  );
}

export default MenuBar;
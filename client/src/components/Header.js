import React from "react";
import { connect } from "mongodb";

import { Link, NavLink } from "react-router-dom";
import LangCustomSelect from "./LangCustomSelect";
import ThemeCustomSelect from "./ThemeCustomSelect";

const Header = () => {
  return (
    <div id="nav-container">
      <Link to="/" className="logo-container">
        <h1 id="logo">
          QD<span>X</span>
        </h1>
      </Link>
      <div id="left-nav-container">
        <nav>
          <ul id="nav-links">
            <NavLink to="/dashboard">پروفایل کاربری</NavLink>

            <NavLink to="#">دسته بندی دوره ها</NavLink>
            <NavLink to="/aboutus">درباره ما</NavLink>
            <NavLink to="/contactus">تماس با ما</NavLink>
            <NavLink to="/Login">ورود</NavLink>
            <NavLink to="/register">ثبت نام</NavLink>
          </ul>
        </nav>
        <LangCustomSelect className="#language" />
        <ThemeCustomSelect />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  isAuthenticated: "";
};
export default connect(mapStateToProps)(Header);

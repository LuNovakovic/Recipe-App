import React, { Fragment, useContext, useEffect } from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import AuthContext from "../../auth/authContext";
import RecipeContext from "../../context/recipe/recipeContext";

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext);
  const recipeContext = useContext(RecipeContext);

  const { isAuthenticated, logout, user, loadUser } = authContext;
  const { clearRecipes } = recipeContext;

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </Fragment>
  );

  return (
    <div className="navbar bg-danger">
      <h1>
        <Link to="/">{title}</Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: propTypes.string.isRequired,
  icon: propTypes.string,
};

Navbar.defaultProps = {
  title: "Recipe App",
};

export default Navbar;

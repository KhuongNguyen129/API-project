import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div id="top-bar">
      <NavLink className="NavLinkClass" exact to="/">
        <img
          id="kbnb-logo"
          src="https://cdn.usbrandcolors.com/images/logos/airbnb-logo.svg"
        />
        <h2>KhuongBnB</h2>
      </NavLink>

      <div className="create-spot">
        {sessionUser && <button>Create a New Spot</button>}
        {isLoaded && (
          <li>
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </div>
    </div>
  );
}

export default Navigation;

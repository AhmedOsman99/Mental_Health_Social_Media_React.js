import React from "react";
import { Link } from "react-router-dom";
import "../CSS/NavBar.css";

export function NavBar() {
  return (
    <div className="home">
      <div className="frame">
        <div className="group">
          <div className="frame-2">
            <h1 className="text-wrapper">LOGO</h1>
            <div className="overlap-group-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="search"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="frame-3">
        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <Link to="/signup">
              <img
                className="group-2"
                alt="Group"
                src="/assets/house-door.svg"
              />
            </Link>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <Link to="/login">
              <img
                className="group-2"
                alt="Group"
                src="/assets/person-plus.svg"
              />
            </Link>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <Link to="/Doctor_form">
              <img className="group-2" alt="Group" src="/assets/bell.svg" />
            </Link>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <Link to="/User_form">
              <img
                className="group-2"
                alt="Group"
                src="/assets/pencil-square.svg"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

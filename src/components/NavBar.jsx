import React from "react";
import "../CSS/NavBar.css";

export const NavBar = () => {
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
              {/* <img
                className="iconamoon-search"
                alt="Iconamoon search"
                src="/assets/search.svg"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="frame-3">
        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <div className="overlap-group-2">
              <img
                className="group-2"
                alt="Group"
                src="/assets/house-door.svg"
              />
            </div>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <div className="overlap-group-2">
              <img
                className="group-2"
                alt="Group"
                src="/assets/person-plus.svg"
              />
            </div>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <div className="overlap-group-2">
              <img className="group-2" alt="Group" src="/assets/bell.svg" />
            </div>
          </div>
        </div>

        <div className="notification-icon-wrapper">
          <div className="notification-icon">
            <div className="overlap-group-2">
              <img
                className="group-2"
                alt="Group"
                src="/assets/pencil-square.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import "../Css/SideBar.css";
import { useNavigate } from 'react-router-dom';
import 'material-icons/iconfont/material-icons.css';


const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the auth token from local storage
    localStorage.removeItem("authToken");

    // Redirect to the login page or any other desired page
    navigate("/");
  };


  return (
    <div class="Sidebar-container">
      <div class="sidebar">
        <div class="user-account"></div>
        <ul class="links">
          <h4>Main Menu</h4>
          <li>
            <span className="material-icons-outlined">dashboard</span>
            <a href="/Profile">Profile</a>
          </li>
          <li>
            <span className="material-icons-outlined">show_chart</span>
            <a href="/Trip">Trips</a>
          </li>
          <li>
          <span className="material-icons-outlined">favorite</span>
            <a href="/liked-trips">Liked</a>
          </li>
          {/* <li>
            <span className="material-icons-outlined">flag</span>
            <a href="#">Reports</a>
          </li> */}
          <hr className="SideBarHr" />
          <h4>Advanced</h4>
          <li>
            <span className="material-icons-outlined">person</span>
            <a href="/CreateTrips">Create Trip</a>
          </li>
          <li>
            <span className="material-icons-outlined">group</span>
            <a href="/TouristLocator">TouristLocator</a>
          </li>
          <hr className="SideBarHr" />
          <h4>Account</h4>
          {/* <li>
            <span className="material-icons-outlined">bar_chart</span>
            <a href="#">Overview</a>
          </li> */}
          <li>
            <span className="material-icons-outlined">mail</span>
            <a href="/Help">Help</a>
          </li>
          <li>
            <span className="material-icons-outlined">settings</span>
            <a href="/Settings">Settings</a>
          </li>
          <li class="logout" onClick={handleLogout}>
            <span className="material-icons-outlined">logout</span>
            <a >Logout</a>
          </li>
          <li>
          <span className="material-icons-outlined">home</span>
            <a href="/Showcase">Home</a>
          </li>
          <li></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

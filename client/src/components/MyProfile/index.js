import React from "react";
import { HiOutlinePencil } from "react-icons/hi2";
import Header from "../Header";
import "./index.css";

function MyProfile() {
  return (
    <div className="main-container">
      <Header />
      <div className="profile">
        <div className="header-profile-container">
          <h1>Profile</h1>
          <button className="profile-button" >
            Edit Profile <HiOutlinePencil size={20} color="#4a4141" />{" "}
          </button>
        </div>
        <div className="profile-container">
          <div className="profile-image-container">
            <img
              className="profile-photo"
              src="https://yt3.googleusercontent.com/J_mq5lnsvEVLch-aTcRWz5XPmoErKvBly8Y3laGgjzrsT7f8creppn5OV0s3uQJKg2TAbrw3KQ=s900-c-k-c0x00ffffff-no-rj"
              alt="profile"
            />
            <h1>Name</h1>
            <p>created At</p>
          </div>
          <div className="profile-details">
            <h1>user name</h1>
            <p className="count">count of books</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;

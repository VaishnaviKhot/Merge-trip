import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./SideBar";
import "../Css/Profile.css";
import { getToken } from "../authUtils";
import { Link } from "react-router-dom";

const UserProfileDisplay = () => {
  const [profile, setProfile] = useState({});
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("YOUR_BACKGROUND_IMAGE_URL");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();

      try {
        const response = await axios.get("http://localhost:8080/api/auth/getuser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = response.data;
        const { _id, name, email, date } = userData;

        setProfile({ _id, name, email, date });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleBackgroundImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("backgroundImage", file);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/updatebackground", formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "multipart/form-data",
        },
      });

      const user = response.data;
      setBackgroundImage(user.backgroundUrl);
    } catch (error) {
      console.error("Error uploading background image:", error);
    }
  };

  // Dummy posts data with travel image
  const dummyPosts = [
    {
      id: 1,
      title: "Dummy Post 1",
      images: ["url_of_travel_image_1"],
    },
    {
      id: 2,
      title: "Dummy Post 2",
      images: ["url_of_travel_image_2"],
    },
    // Add more dummy posts as needed
  ];

  return (
    <>
      <div>
        <Header setAuthToken={setAuthToken} />
        <Sidebar />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="content-profile-page">
            <div className="profile-user-page card">
              <div className="img-user-profile">
                <img className="profile-bgHome" src={backgroundImage} alt="" />
                <input type="file" onChange={handleBackgroundImageUpload} />
                <img className="avatar" src="YOUR_AVATAR_IMAGE_URL" alt="jofpin" />
              </div>
              <button>Follow</button>
              <div className="user-profile-data">
                <h1>{profile.name}</h1>
                <p>{profile.email}</p>
              </div>
              <div className="description-profile">
                Registered on {new Date(profile.date).toLocaleDateString()}
              </div>
              <ul className="data-user">
                <li>
                  <strong>{profile._id}</strong>
                  <span>User ID</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Section for dummy posts */}
        <div className="dummy-posts-section">
          <h2>Dummy Posts</h2>
          <div className="dummy-posts-container">
            {dummyPosts.map((post) => (
              <div key={post.id} className="dummy-post">
                <div className="post-box">
                  <p>{post.title}</p>
                  {post.images.map((image, index) => (
                    <img key={index} src={image} alt={`Dummy Image ${index + 1}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileDisplay;

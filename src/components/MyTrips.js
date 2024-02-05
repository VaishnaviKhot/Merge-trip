import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./SideBar";
import "../Css/Profile.css";
import { getToken } from "../authUtils";
import { Link } from "react-router-dom";
import Goa from "../assests/Goa.jpg";

const UserTripsDisplay = () => {
  const [profile, setProfile] = useState({});
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchUserTrips = async () => {
      const token = getToken();

      try {
        // Retrieve profileId from localStorage
        const profileId = localStorage.getItem("profileId");
        console.log("Profile ID:", profileId);

        const response = await axios.get(
          `http://localhost:8080/api/trip/getUserTrips?userId=${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data); // Check the response in the console

        setTrips(response.data.trips);
      } catch (error) {
        console.error("Error fetching user trips:", error);
      }
    };

    fetchUserTrips();
  }, []);

  return (
    <>
      <div className="Trip-list">
        {trips.map((trip) => (
          <Link
            key={trip._id}
            to={`/trip-details/${trip._id}`}
            className="trip-card-link"
          >
            <div className="trip-card">
              <img src={trip.imageUrl || Goa} alt={`Image of ${trip.name}`} />
              <div className="trip-details">
                <p>Name: {trip.name}</p>
                <p>
                  From: {trip.from} ➡️ To: {trip.destination}
                </p>
                <p>Age: {trip.age}</p>
                <p>
                  Date: {trip.date} & Time: {trip.time}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default UserTripsDisplay;

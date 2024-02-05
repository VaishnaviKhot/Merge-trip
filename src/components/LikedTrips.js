// LikedTrips.jsx
import React, { useEffect } from "react";
import { useLikedTrips } from "./LikedTripsContext";

const LikedTrips = () => {
  const { likedTrips } = useLikedTrips();

  useEffect(() => {
    console.log("LikedTrips component state:", likedTrips);
  }, [likedTrips]);

  return (
    <div>
      <h2>Liked Trips</h2>
      <ul>
        {likedTrips.map((trip, index) => (
          <li key={index}>{trip.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikedTrips;

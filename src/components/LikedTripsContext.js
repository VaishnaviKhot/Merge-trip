// LikedTripsContext.jsx
import React, { createContext, useContext, useState } from "react";

const LikedTripsContext = createContext();

const LikedTripsProvider = ({ children }) => {
  const [likedTrips, setLikedTrips] = useState([]);

  const addLikedTrip = (trip) => {
    setLikedTrips((prevLikedTrips) => [...prevLikedTrips, trip]);
  };

  return (
    <LikedTripsContext.Provider value={{ likedTrips, addLikedTrip }}>
      {children}
    </LikedTripsContext.Provider>
  );
};

const useLikedTrips = () => {
  const context = useContext(LikedTripsContext);
  if (!context) {
    throw new Error("useLikedTrips must be used within a LikedTripsProvider");
  }
  return context;
};

export { LikedTripsProvider, useLikedTrips };

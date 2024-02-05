// import React from 'react';
// import "../Css/TripList.css";
// import Goa from "../assests/Goa.jpg";
// import Header from './Header';

// const Trip = () => {
//   // Dummy trips data
//   const dummyTrips = [
//     {
//       id: '1',
//       personName: 'John Doe',
//       destination: 'Paris',
//       from: 'New York',
//       age: 25,
//       date: '2024-01-01',
//       time: '10:00 AM',
//       imageUrl: Goa,
//     },
//     {
//       id: '2',
//       personName: 'Jane Smith',
//       destination: 'London',
//       from: 'San Francisco',
//       age: 30,
//       date: '2024-02-15',
//       time: '2:30 PM',
//       imageUrl: Goa,
//     },
//   ];

//   return (
//     <>
//     <Header />
//       <div className='Trip-list'>
//         {dummyTrips.map((trip) => (
//           <div key={trip.id} className='trip-card'>
//             <img src={trip.imageUrl} alt={`Image of ${trip.personName}`} />
//             <div className='trip-details'>
//               <p>Name: {trip.personName}</p>
//               <p>From: {trip.from} ➡️ To: {trip.destination}</p>
//               {/* <p>To: {trip.destination}</p> */}
//               <p>Age: {trip.age}</p>
//               <p>Date: {trip.date} & Time: {trip.time}</p>
//               {/* <p>Time: {trip.time}</p> */}
//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default Trip;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Css/TripList.css";
import Goa from "../assests/Goa.jpg";
import Header from "./Header";
import Sidebar from "./SideBar";
import "material-icons/iconfont/material-icons.css";

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("all");

  useEffect(() => {
    // Fetch trips from the server
    const fetchTrips = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/trip/getAllTrips"
        );
        setTrips(response.data.trips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchTrips();
  }, []); // Empty dependency array ensures the effect runs once on mount

  // Filter trips based on search query and type
  const filteredTrips = trips.filter((trip) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const fieldToSearch = trip[searchType]?.toLowerCase();

    if (searchType === "all") {
      // Check if the search query is present in any of the trip's fields
      return Object.values(trip).some(
        (value) =>
          value && value.toString().toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Check specifically in the selected field for the search
    return fieldToSearch?.includes(lowerCaseQuery);
  });

  const navigate = useNavigate();

  const handleCardClick = (tripId) => {
    const selectedTrip = trips.find((trip) => trip._id === tripId);
    console.log("Selected Trip:", selectedTrip);
    navigate(`/trip-details/${tripId}`);
  };

  return (
    <>
      {/* Display your search bar */}
      <Header setSearchQuery={setSearchQuery} setSearchType={setSearchType} />
      <Sidebar />
      <div className="Trip-list">
        {filteredTrips.map((trip) => (
          <Link
            key={trip._id}
            to={`/trip-details/${trip._id}`}
            className="trip-card-link"
          >
            <div
              className="trip-card"
              onClick={() => handleCardClick(trip._id)}
            >
              {/* Render your trip card content here */}
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

export default Trip;

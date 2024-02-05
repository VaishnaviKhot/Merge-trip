import React from 'react';
import { useParams } from 'react-router-dom';


const DestinationDetail = ({ places }) => {
  const { id } = useParams();

  // Find the destination based on the id
  const destination = places.find(place => place.id === parseInt(id, 10));

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div>
      <h2>{destination.name}</h2>
      <p>Location: {destination.location}</p>
      <p>Price: ${destination.price}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default DestinationDetail;

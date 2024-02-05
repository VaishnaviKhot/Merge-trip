// // WhatsAppRedirect.jsx
// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";

// const WhatsAppRedirect = () => {
//   const { phoneNumber } = useParams();

//   useEffect(() => {
//     if (phoneNumber) {
//       // Redirect to WhatsApp with the provided phone number
//       window.location.href = `https://wa.me/${phoneNumber}`;
//     }
//   }, [phoneNumber]);

//   return (
//     <div>
//       {/* You can add a loading message or other content if needed */}
//       Redirecting to WhatsApp...
//     </div>
//   );
// };

// export default WhatsAppRedirect;


// WhatsAppRedirect.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLikedTrips } from "./LikedTripsContext";

const WhatsAppRedirect = () => {
  const { id } = useParams();
  const { likedTrips } = useLikedTrips();

  useEffect(() => {
    const trip = likedTrips.find((trip) => trip.id === Number(id));

    if (trip && trip.PhoneNumber) {
      // Redirect to WhatsApp with the phone number from the trip details
      window.location.href = `https://wa.me/${trip.PhoneNumber}`;
    }
  }, [id, likedTrips]);

  return (
    <div>
      {/* You can add a loading message or other content if needed */}
      Redirecting to WhatsApp...
    </div>
  );
};

export default WhatsAppRedirect;

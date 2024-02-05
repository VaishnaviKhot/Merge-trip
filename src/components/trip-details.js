// TripDetails.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "material-icons/iconfont/material-icons.css";
import "../Css/TripDetails.css";
import { useLikedTrips } from "./LikedTripsContext";

const TripDetails = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const [tripDetails, setTripDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState("");
  const [comments, setComments] = useState([]);


  const { addLikedTrip } = useLikedTrips();

  const handleLike = () => {
    console.log("Adding trip to LikedTrips:", tripDetails);
    addLikedTrip(tripDetails);
  };

  const handleMessage = () => {
    if (tripDetails && tripDetails.PhoneNumber) {
      // Redirect to WhatsApp with the phone number from trip details
      window.location.href = `https://wa.me/${tripDetails.PhoneNumber}`;
    } else {
      // Provide a message if the phone number is not available
      alert("Phone number not available for WhatsApp redirection.");
    }
  };

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/trip/trip-details/${id}`
        );
  
        // Fetch comments for the trip
        const commentResponse = await axios.get(
          `http://localhost:8080/api/comment/comments-for-trip/${id}`
        );
  
        setTripDetails({
          ...response.data.tripDetails,
          comments: commentResponse.data.comments,
        });
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };
  
    fetchTripDetails();
  }, [id]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      await axios.post("http://localhost:8080/api/comment/add-comment", {
        tripId: "yourTripId", // Replace with the actual tripId
        text: comment,
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  if (!tripDetails) {
    return <p className="trip-details-loading">Loading...</p>;
  }

  return (
    <div className="trip-details-container">
      <h2 className="trip-details-title">{tripDetails.name}</h2>
      <p className="trip-details-location">
        From: {tripDetails.from} ➡️ To: {tripDetails.destination}
      </p>
      <p className="trip-details-age">Age: {tripDetails.age}</p>
      <p className="trip-details-age">PhoneNumber: {tripDetails.PhoneNumber}</p>
      <p className="trip-details-date-time">
        Date: {tripDetails.date} & Time: {tripDetails.time}
      </p>
      <button className="toggle-comments-button" onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map((c, index) => (
            <p key={index} className="comment">
              {c}
            </p>
          ))}
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="add-comment-button" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      )}
      <button className="toggle-comments-button" onClick={handleLike}>
        🤍 Like
      </button>
      <button className="toggle-comments-button" onClick={handleMessage}>
        📞 Message
      </button>
    </div>
  );
};

export default TripDetails;

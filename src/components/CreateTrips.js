import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "../Css/CreateTrips.css";
import SideBar from "./SideBar";

const CreateTripForm = () => {
  const [tripData, setTripData] = useState({
    name: "",
    destination: "",
    from: "",
    age: "",
    PhoneNumber: "",
    date: new Date(),
    time: "12:00",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is a number for "age" and "PhoneNumber"
    if ((name === "age" || name === "PhoneNumber") && isNaN(value)) {
      alert(`Please enter a valid number for ${name}`);
      return;
    }

    setTripData({ ...tripData, [name]: value });
  };

  const handleDateChange = (date) => {
    setTripData({ ...tripData, date });
  };

  const handleTimeChange = (time) => {
    setTripData({ ...tripData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in tripData) {
      if (tripData[key] === "" || tripData[key] === null) {
        alert(`Please fill in all fields`);
        return;
      }
    }

    const formattedDate = tripData.date.toISOString();
    const dataToSend = { ...tripData, date: formattedDate };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/trip/createTrip",
        dataToSend  // Send the modified data with formatted date
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <>
      <SideBar />
      <div className="create-trip-form-container">
        <h2>Design Your Destiny</h2>
        <form onSubmit={handleSubmit}>
          {/* ... other form elements ... */}
          <button type="submit" className="create-trip-button">
            Create Trip
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateTripForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/UserProfileForm.css";

const UserProfileForm = () => {
  const [Img, setImg] = useState("");
  const [Age, setAge] = useState("");
  const [Gender, setGender] = useState("");
  const [Interest, setInterest] = useState("");
  const [Favourite, setFavourite] = useState("");
  const [Bio, setBio] = useState("");
  const [Language, setLanguage] = useState("");
  const [Living, setLiving] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform login logic using the email and password state values
    console.log("Img:", Img);
    console.log("Age:", Age);
  };

  const Navigate = useNavigate();
  const handleSave = () => {
    Navigate("/");
  };

  return (
    <form className="form-control" onSubmit={handleFormSubmit}>
            <input
              type="Img"
              name="Img"
              id="Img"
              placeholder="Img URL"
              value={Img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
            <input
              type="Age"
              name="Age"
              id="Age"
              placeholder="Age"
              value={Age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              type="Gender"
              name="Gender"
              id="Gender"
              placeholder="Gender"
              value={Gender}
              onChange={(e) => setGender(e.target.value)}
              required
            />
            <input
              type="Interest"
              name="Interest"
              id="Interest"
              placeholder="Interest"
              value={Interest}
              onChange={(e) => setInterest(e.target.value)}
            />
            <input
              type="Favourite Travel Destination"
              name="Favourite Travel Destination"
              id="Favourite Travel Destination"
              placeholder="Favourite Travel Destination"
              value={Favourite}
              onChange={(e) => setFavourite(e.target.value)}
              required
            />
            <input
              type="Bio"
              name="Bio"
              id="Bio"
              placeholder="Bio"
              value={Bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="Language"
              name="Language"
              id="Language"
              placeholder="Language"
              value={Language}
              onChange={(e) => setLanguage(e.target.value)}
              required
            />
            <input
              type="Living In"
              name="Living In"
              id="Living In"
              placeholder="Living In"
              value={Living}
              onChange={(e) => setLiving(e.target.value)}
            />

            <button className="Userprofileform" type="submit" onClick={handleSave}>
              Save
            </button>
          </form>
  );
};

export default UserProfileForm;
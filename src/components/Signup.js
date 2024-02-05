import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Css/Login.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const key in credentials) {
      if (credentials[key] === "") {
        window.alert(`Please fill in all fields`);
        return;
      }
    }

    const { name, email, password, confirmpassword } = credentials;

    // Check if passwords match
    if (password !== confirmpassword) {
      window.alert("Passwords do not match");
      return;
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      window.alert("Invalid email address");
      return;
    }

    // Check if password meets criteria
    if (password.length < 6) {
      window.alert("Password should be at least 6 characters long");
      return;
    }

    // Perform signup logic using the state values
    const response = await fetch("http://localhost:8080/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      window.alert("Account created successfully");
    } else {
      window.alert("Error creating account. Please check your credentials.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <section className="login">
        <div className="login-overlay">
          <form className="form-control" onSubmit={handleFormSubmit}>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              onChange={onChange}
              aria-describedby="emailHelp"
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Choose your password"
              onChange={onChange}
              minLength={6}
              required
            />
            <input
              type="password"
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm your password"
              onChange={onChange}
              minLength={6}
              required
            />
            <button type="submit">Create Your Account</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;

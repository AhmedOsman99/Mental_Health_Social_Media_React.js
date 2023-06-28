import React, { useState } from "react";
import "../CSS/register.css";
import loginImage from "../images/login.PNG";
import { useNavigate } from "react-router-dom";

export function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Perform registration logic here using the captured values
  // firstName, lastName, email, password
  // You can make an API call to register the user or handle it as per your requirements

  // Example API call using fetch:
  // fetch("/api/register", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     firstName: firstName,
  //     lastName: lastName,
  //     email: email,
  //     password: password,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     // Handle the response data after registration
  //     console.log(data);
  //     // Optionally, you can redirect the user to the login page or perform other actions
  //     navigate("/login");
  //   })
  //   .catch((error) => {
  //     // Handle any errors that occur during registration
  //     console.error(error);
  //   });
  const handleRegister = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password) {
      // All required fields are filled, navigate to the appropriate form
      if (e.target.name === "doctor_button") {
        navigate("/Doctor_form");
      } else if (e.target.name === "user_button") {
        navigate("/User_form");
      }
    } else {
      // Display an error message or perform other actions
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="sign-up">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="login">
            <div className="overlap-group">
              <div className="rectangle" />
              <h1 className="text-wrapper">Sign up</h1>
              <form onSubmit={handleRegister}>
                <div className="frame">
                  <div className="div">First name</div>
                  <input
                    type="text"
                    className="rectangle-2"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="frame-2">
                  <div className="text-wrapper-2">Last name</div>
                  <input
                    type="text"
                    className="rectangle-3"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="ellipse" />
                <div className="ellipse-2" />
                <div className="ellipse-3" />
                <div className="ellipse-4" />
                <div className="frame-3">
                  <div className="text-wrapper-3">Email</div>
                  <input
                    type="email"
                    className="rectangle-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="frame-4">
                  <div className="text-wrapper-4">Password</div>
                  <input
                    type="password"
                    className="rectangle-5"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="div-wrapper">
                  <button
                    type="submit"
                    className="doctor_button"
                    name="doctor_button"
                    onClick={handleRegister}
                  >
                    Doctor
                  </button>
                </div>

                <div className="div-wrapper-two">
                  <button
                    type="submit"
                    className="user_button"
                    name="user_button"
                    onClick={handleRegister}
                  >
                    User
                  </button>
                </div>
              </form>
              <div className="group">
                <button className="link-btn" onClick={() => navigate("/login")}>
                  Do you have an Account? Login
                </button>
              </div>
            </div>
          </div>
          <img
            className="untitled-design"
            alt="Untitled design"
            src={loginImage}
          />
        </div>
      </div>
    </div>
  );
}

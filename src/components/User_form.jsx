import React, { useState } from "react";
import "../CSS/User_form.css";
import loginImage from "../images/login.PNG";
import { useNavigate } from "react-router-dom";
export function User_form() {
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const navigate = useNavigate();

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (Age && gender && phonenumber) {
      // All required fields are filled, navigate to the appropriate form
      navigate("/login");
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
              <h1 className="text-wrapper">User Form</h1>
              <form onSubmit={handleRegister}>
                <div className="frame">
                  <div className="div">Age</div>
                  <input
                    type="number"
                    className="rectangle-2"
                    value={Age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />
                </div>
                <div className="frame-2">
                  <div>
                    <label>Gender:</label>
                    <div>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={handleGenderChange}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={handleGenderChange}
                      />
                      <label htmlFor="female">Female</label>
                    </div>
                  </div>
                </div>
                <div className="ellipse" />
                <div className="ellipse-2" />
                <div className="ellipse-3" />
                <div className="ellipse-4" />
                <div className="frame-3">
                  <div className="text-wrapper-3">Phonenumber</div>
                  <input
                    type="number"
                    className="rectangle-4"
                    value={phonenumber}
                    onChange={(e) => setphonenumber(e.target.value)}
                    required
                  />
                </div>

                <div className="div-wrapper-user">
                  <button
                    type="submit"
                    className="SignUp_button"
                    name="SignUp_button"
                    onClick={handleRegister}
                  >
                    Sign Up
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

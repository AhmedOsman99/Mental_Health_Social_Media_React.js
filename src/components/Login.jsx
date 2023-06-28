import React, { useState } from "react";
import "../CSS/login.css";
import loginImage from "../images/login.PNG";
import { useNavigate } from "react-router-dom";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic or API call using email and password values
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="rectangle" />
              <h1 className="text-wrapper">Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="frame">
                  <div className="div">Email</div>
                  <div className="rectangle-2">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      placeholder="Enter your email"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="ellipse" />
                <div className="ellipse-2" />
                <div className="ellipse-3" />
                <div className="ellipse-4" />
                <div className="group">
                  <div className="frame-2">
                    <div className="text-wrapper-2">Password</div>
                    <div className="rectangle-3">
                      <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        placeholder="Enter your password"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="group-2">
                    <div className="text-wrapper-3">Forgot password?</div>
                    <div className="rectangle-4" />
                  </div>
                  <div className="frame-3">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="checkbox-input"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      <span className="checkmark"></span>
                      <div className="text-wrapper-4">Keep me logged in</div>
                    </label>
                  </div>
                </div>
                <div className="group-3">
                  <button
                    className="link-btn"
                    onClick={() => navigate("/signup")}
                  >
                    Do not have Account? Sign UP
                  </button>
                  <div className="rectangle-6" />
                </div>
                <div className="div-wrapper">
                  <button type="submit" className="text-wrapper-7">
                    Login
                  </button>
                </div>
              </form>
              <div className="ellipse-5" />
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

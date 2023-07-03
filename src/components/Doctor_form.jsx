import React, { useState } from "react";
import "../CSS/Doctor_form.css";
import loginImage from "../images/login.PNG";
import { useNavigate } from "react-router-dom";

export function Doctor_form() {
  const navigate = useNavigate();
  const [specialization, setspecialization] = useState("");
  const [yearsofexperience, setyearsofexperience] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [certificate, setCertificate] = useState(null);
  // const [password, setPassword] = useState("");

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
    if (specialization && yearsofexperience && phonenumber && certificate) {
      // All required fields are filled, navigate to the appropriate form
      navigate("/login");
    } else {
      // Display an error message or perform other actions
      alert("Please fill in all required fields.");
    }
  };
  const handleCertificateUpload = (e) => {
    const file = e.target.files[0];
    setCertificate(file);
  };
  return (
    <div className="sign-up">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="login">
            <div className="overlap-group">
              <div className="rectangle" />
              <h1 className="text-wrapper">Doctor Form</h1>
              <form onSubmit={handleRegister}>
                <div className="frame">
                  <div className="div">specialization</div>
                  <input
                    type="text"
                    className="rectangle-2"
                    value={specialization}
                    onChange={(e) => setspecialization(e.target.value)}
                    required
                  />
                </div>
                <div className="frame-2">
                  <div className="text-wrapper-2">Add Certificate</div>
                  <input
                    type="file"
                    onChange={handleCertificateUpload}
                    required
                  />
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
                <div className="frame-4">
                  <div className="text-wrapper-4">Years of Experience</div>
                  <input
                    type="number"
                    className="rectangle-5"
                    value={yearsofexperience}
                    onChange={(e) => setyearsofexperience(e.target.value)}
                    required
                  />
                </div>

                <div className="div-wrapper-doctor">
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

import React, { useState } from "react";
import "../CSS/Doctor_form.css";
import loginImage from "../images/login.PNG";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Doctor_form() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
    Certificate: '',
  });

  const [specialty, setSpecialty] = useState('');
  const [Certificate, setCertificate] = useState(null);

  const handleRegister = (e) => {
    e.preventDefault();

    const errors = {};
    if (!firstName) {
      errors.firstName = 'Please enter your first name';
    }
    if (!lastName) {
      errors.lastName = 'Please enter your last name';
    }
    if (!email) {
      errors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!password) {
      errors.password = 'Please enter a password';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (isDoctor) {
      if (!Certificate) {
        errors.Certificate = 'Please upload your certificate';
      } else if (!Certificate.name.match(/\.(jpg|jpeg|png)$/)) {
        errors.Certificate = 'Please upload a valid image file (JPG, JPEG, PNG)';
      }
      if (!specialty) {
        errors.specialty = 'Please select your specialty';
      }
    }

    // Set form errors and prevent submission if there are errors
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create form data to send to the server
    const formData = new FormData();
    formData.append('username', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_type', isDoctor ? 'doctor' : 'user');

    // Append profile picture and specialty fields if user is a doctor
    if (isDoctor) {
      formData.append('certificate', Certificate);
      formData.append('specialty', specialty);
    }

    // Send form data to the server using Axios
    setIsLoading(true);
    axios.post('http://127.0.0.1:8000/api/register/', formData)
      .then(response => {
        console.log(response.data);
        setIsLoading(false);
        alert('Registration successful!');
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        alert('Registration failed. Please try again later.');
      });
  };

  const handleCertificateChange = (event) => {
    setCertificate(event.target.files[0]);
  }

  // Toggle isDoctor state when checkbox is clicked
  const handleIsDoctorChange = (event) => {
    setIsDoctor(event.target.checked);
  }

  // Hide certificateand specialty fields if user is not a doctor
  const CertificateField = isDoctor ? (
    <div className="frame-7">
      <div className="error-message">{formErrors.Certificate}</div>
      <div className="text-wrapper-6">upload certificate</div>
      <input type="file" className={`input-field ${formErrors.Certificate && 'error'}`} id="profile-picture" onChange={handleCertificateChange} />
    </div>
  ) : null;

  const specialtyField = isDoctor ? (
    <div className="frame-6">
      <div className="error-message">{formErrors.specialty}</div>
      <select className={`input-field ${formErrors.specialty && 'error'}`} id="specialty" value={specialty} onChange={(event) => setSpecialty(event.target.value)}>
        <option value="">Select Specialty</option>
        <option value="cardiology">Cardiology</option>
        <option value="neurology">Neurology</option>
        <option value="pediatrics">Pediatrics</option>
        <option value="psychiatry">Psychiatry</option>
      </select>
    </div>
  ) : null;


  
 
  
  return (
    <div className="sign-up">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="login">
            <div className="overlap-group">
              <div className="rectangle" />
              <h1 className="text-wrapper">Sign up</h1>
              <form onSubmit={handleRegister}>
                <div className="inputs">
                      <div className="frame">
                      <div className="error-message">{formErrors.firstName}</div>
                      <input type="text" className={`input-field ${formErrors.firstName && 'error'}`} placeholder="First Name" id="first-name" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                          
                      </div>
                      <div className="frame-2">
                      <div className="error-message">{formErrors.lastName}</div>
                       <input type="text" className={`input-field rectangel-2 ${formErrors.lastName && 'error'}`} placeholder="Last Name" id="last-name" value={lastName} onChange={(event) => setLastName(event.target.value)} />
                        
                      </div>

                      <div className="ellipse" />
                      <div className="ellipse-2" />
                      <div className="ellipse-3" />
                      <div className="ellipse-4" />

                      <div className="frame-3 ">
                      <div className="error-message">{formErrors.email}</div>
                      <input type="email" className={`input-field  ${formErrors.email && 'error'}`} placeholder="Email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        
                      </div>
                      <div className="frame-4 mb-2">
                      <div className="error-message">{formErrors.password}</div>
                      <input type="password" className={`input-field  ${formErrors.password && 'error'}`} placeholder="Password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                      </div>

                      <div className="frame-5">
                      <div className="error-message">{formErrors.confirmPassword}</div>
                      <input type="password" className={`input-field  ${formErrors.confirmPassword && 'error'}`} placeholder="Confirm Password" id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
                      </div>

                     <div className="frame-8">
                    <label htmlFor="is-doctor" className="checkbox-label">

                        <input type="checkbox" id="is-doctor" checked={isDoctor} onChange={handleIsDoctorChange} />
                        <span className="checkmark"></span>
                        Are you a doctor?
                    </label>
                  </div>
                  {CertificateField}
                  {specialtyField}
                </div>
                <div className="div-wrapper-doctor">
                <button type="submit" className="SignUp_button">{isLoading ? 'Loading...' : 'Sign Up'}</button>

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

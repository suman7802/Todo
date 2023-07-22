import React, {useState} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const url = "http://localhost:8000/api/user/login";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [responseFromServer, setResponseFromServer] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(isValid ? "" : "Invalid email address");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        url,
        {
          email,
          password,
        },
        {
          headers: {"Content-Type": "application/json"},
          withCredentials: true,
        }
      );
      const data = await response.data;
      setResponseFromServer(data.message);
    } catch (error) {
      console.error("Error during login:", error.message);
      setResponseFromServer(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        {responseFromServer && <p>{responseFromServer}</p>}
        {emailError && <p className="error-message">{emailError}</p>}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <div className="toggle"></div>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Login
        </button>
        <p>
          Don't have an account? <Link to="/registration">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;

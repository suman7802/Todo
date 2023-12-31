import React, {useState} from "react";
import {Link} from "react-router-dom";

// const url = `/api/user/registration`;
const url = `http://localhost:8000/api/user/registration`;

const RegistrationForm = () => {
  const [responseFromServer, setResponseFromServer] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: isValid ? "" : "Invalid Email",
    }));
  };

  const validatePassword = (password) => {
    const isValid = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(password);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: isValid ? "" : "8+ Chars, Num, Special Chars",
    }));
  };

  const validateConfirmPassword = (confirmPassword) => {
    const isValid = formData.password === confirmPassword;
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: isValid ? "" : "Passwords Don't Match.",
    }));
  };

  const handlePasswordCopyPaste = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      validateEmail(value);
    } else if (name === "password") {
      validatePassword(value);
      validateConfirmPassword(formData.confirmPassword);
    } else if (name === "confirmPassword") {
      validatePassword(value);
      validateConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords don't match.";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
    }
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          conformPassword: formData.confirmPassword,
        }),
      });
      if (response.status == 201) {
        setResponseFromServer("User Registered");
      }
      if (response.status == 400) {
        setResponseFromServer("User Already Exists");
      }
    } catch (error) {
      setResponseFromServer(error.message);
      console.error("Error During Login:", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  const {email, password, confirmPassword} = formData;
  const {
    email: emailError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = errors;

  return (
    <div className="container">
      <h2>Registration</h2>
      {responseFromServer && <p>{responseFromServer}</p>}
      {emailError || passwordError || confirmPasswordError ? (
        <div className="error-messages">
          <p>{emailError}</p>
          <p>{passwordError}</p>
          <p>{confirmPasswordError}</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              onPaste={handlePasswordCopyPaste}
              onCopy={handlePasswordCopyPaste}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <div className="password-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
              onPaste={handlePasswordCopyPaste}
              onCopy={handlePasswordCopyPaste}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}>
              {passwordVisible ? "Hide" : "Show"}
            </span>
          </div>
        </div>
        <button type="submit" className="submit-button">
          Register
        </button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;

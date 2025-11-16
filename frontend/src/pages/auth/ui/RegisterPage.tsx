import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

// ИКОНКИ — как в макете
import {
  BsPersonPlusFill, // First Name
  BsPersonVcardFill, // Last Name
  BsPersonFill, // Username
  BsEnvelopeFill, // Email
  BsLockFill, // Password
  BsUnlockFill, // Confirm Password
} from "react-icons/bs";

// Картинки
import backgroundPattern from "@/shared/assets/images/auth/background.png";
import personImage from "@/shared/assets/images/auth/register-image.png";

export const RegisterPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Register data:", form);
  };

  return (
    <div
      className="register__container"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <div className="register__card">
        {/* LEFT SIDE */}
        <div className="register__left">
          <img
            src={personImage}
            alt="Register Illustration"
            className="register__img"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="register__right">
          <h2 className="register__title">Sign Up</h2>

          <form onSubmit={handleSubmit} className="register__form">
            {/* First name */}
            <div className="register__input-group">
              <BsPersonPlusFill className="register__input-icon" />
              <input
                className="register__input"
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>

            {/* Last name */}
            <div className="register__input-group">
              <BsPersonVcardFill className="register__input-icon" />
              <input
                className="register__input"
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            {/* Username */}
            <div className="register__input-group">
              <BsPersonFill className="register__input-icon" />
              <input
                className="register__input"
                type="text"
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div className="register__input-group">
              <BsEnvelopeFill className="register__input-icon" />
              <input
                className="register__input"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="register__input-group">
              <BsLockFill className="register__input-icon" />
              <input
                className="register__input"
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="register__input-group">
              <BsUnlockFill className="register__input-icon" />
              <input
                className="register__input"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Checkbox */}
            <label className="register__checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <span>I agree to all terms</span>
            </label>

            <button type="submit" className="register__btn">
              Register
            </button>

            <p className="register__footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

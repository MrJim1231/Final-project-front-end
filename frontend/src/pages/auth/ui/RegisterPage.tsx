import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

// Иконки
import {
  BsPersonPlusFill,
  BsPersonVcardFill,
  BsPersonFill,
  BsEnvelopeFill,
  BsLockFill,
  BsUnlockFill,
} from "react-icons/bs";

// Картинки
import backgroundPattern from "@/shared/assets/images/auth/background.png";
import personImage from "@/shared/assets/images/auth/register-image.png";

// API
import { UserAPI } from "@/shared/api/apiUser";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!form.agree) {
      alert("You must agree to the terms");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
      };

      // Используем централизованный API
      const res = await UserAPI.register(payload);

      alert("Registration successful!");
      console.log("Server response:", res.data);

      // Очистка формы
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="register__container"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <div className="register__card">
        <div className="register__left">
          <img
            src={personImage}
            alt="Register Illustration"
            className="register__img"
          />
        </div>

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
                required
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
                required
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
                required
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
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                required
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
                autoComplete="new-password"
                onChange={handleChange}
                required
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
                autoComplete="new-password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
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

            <button type="submit" className="register__btn" disabled={loading}>
              {loading ? "Loading..." : "Register"}
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

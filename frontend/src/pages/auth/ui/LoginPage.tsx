import "./LoginPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import { BsPersonFill, BsLockFill } from "react-icons/bs";

import backgroundPattern from "@/shared/assets/images/auth/background.png";
import loginImage from "@/shared/assets/images/auth/login-image.png";

// 🔥 Добавляем иконки
import facebookIcon from "@/shared/assets/images/auth/facebook.png";
import googleIcon from "@/shared/assets/images/auth/google.png";
import xIcon from "@/shared/assets/images/auth/x-image.png";

export const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
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
    console.log("Login data:", form);
  };

  return (
    <div
      className="login__container"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <div className="login__card">
        {/* LEFT SIDE */}
        <div className="login__left">
          <h2 className="login__title">Sign In</h2>

          <form onSubmit={handleSubmit} className="login__form">
            {/* Username */}
            <div className="login__input-group">
              <BsPersonFill className="login__input-icon" />
              <input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={form.username}
                onChange={handleChange}
                className="login__input"
              />
            </div>

            {/* Password */}
            <div className="login__input-group">
              <BsLockFill className="login__input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={form.password}
                onChange={handleChange}
                className="login__input"
              />
            </div>

            {/* Checkbox */}
            <label className="login__checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember Me</span>
            </label>

            <button type="submit" className="login__btn">
              Login
            </button>

            {/* 🔥 Social Icons */}
            <div className="login__social">
              <span>Or, Login with</span>

              <div className="login__social-icons">
                <img src={facebookIcon} alt="facebook" />
                <img src={googleIcon} alt="google" />
                <img src={xIcon} alt="x" />
              </div>
            </div>

            {/* Footer */}
            <p className="login__footer">
              Don’t have an account? <Link to="/register">Create One</Link>
            </p>
          </form>
        </div>

        {/* RIGHT IMAGE */}
        <div className="login__right">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="login__img"
          />
        </div>
      </div>
    </div>
  );
};

import "./RegisterPage.css";
import { useState } from "react";
import { Link } from "react-router-dom";

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

    // TODO: отправка на backend
    console.log("Register data:", form);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        {/* LEFT IMAGE */}
        <div className="register-left">
          <img
            src="/register-illustration.png"
            alt="Register Illustration"
            className="register-img"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="register-right">
          <h2>Sign Up</h2>

          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={form.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={form.lastName}
              onChange={handleChange}
            />

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={form.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            {/* Checkbox */}
            <label className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <span>I agree to all terms</span>
            </label>

            <button type="submit" className="register-btn">
              Register
            </button>

            <p className="register-footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

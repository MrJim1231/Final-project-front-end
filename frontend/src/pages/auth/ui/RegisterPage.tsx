import "./RegisterPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// Redux
import { useDispatch } from "react-redux";
import { setUser } from "@/entities/user/model/userSlice";

// Icons
import {
  BsPersonPlusFill,
  BsPersonVcardFill,
  BsPersonFill,
  BsEnvelopeFill,
  BsLockFill,
  BsUnlockFill,
} from "react-icons/bs";

// Images
import backgroundPattern from "@/shared/assets/images/auth/background.png";
import personImage from "@/shared/assets/images/auth/register-image.png";
import googleIcon from "@/shared/assets/images/auth/google.png";

// API
import { UserAPI } from "@/shared/api/apiUser";
import { setAuthToken } from "@/shared/api/api";

export const RegisterPage = () => {
  // ========= INVITE TOKEN =========
  const [searchParams] = useSearchParams();
  const invite = searchParams.get("invite");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // =============================================
  // AUTO LOGIN AFTER GOOGLE (как на LoginPage)
  // =============================================
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const googleToken = params.get("googleToken");
    const userStr = params.get("user");

    if (googleToken && userStr) {
      try {
        const user = JSON.parse(userStr);

        // Save token globally
        setAuthToken(googleToken);

        // Save to localStorage
        localStorage.setItem("token", googleToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Save to Redux
        dispatch(
          setUser({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar || "",
            googleId: user.googleId || null,
            token: googleToken,
          })
        );

        navigate("/");
      } catch (err) {
        console.error("Google auto-login error:", err);
      }
    }
  }, [dispatch, navigate]);

  // ========= HANDLE INPUTS =========
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========= FORM SUBMIT =========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert("Passwords do not match!");
    }

    if (!form.agree) {
      return alert("You must agree to the terms");
    }

    try {
      setLoading(true);

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        password: form.password,
        invite: invite || null,
      };

      const res = await UserAPI.register(payload);

      alert("Registration successful!");

      setForm({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
      });
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  // ====================================
  // GOOGLE REGISTER (УЧИТЫВАЕМ INVITE)
  // ====================================
  const handleGoogleRegister = () => {
    if (invite) {
      window.location.href = `http://localhost:5000/api/auth/google?invite=${invite}`;
    } else {
      window.location.href = `http://localhost:5000/api/auth/google`;
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
            {/* First Name */}
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

            {/* Last Name */}
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
                value={form.confirmPassword}
                autoComplete="new-password"
                onChange={handleChange}
                required
              />
            </div>

            {/* Terms */}
            <label className="register__checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              <span>I agree to all terms</span>
            </label>

            {/* SUBMIT */}
            <button type="submit" className="register__btn" disabled={loading}>
              {loading ? "Loading..." : "Register"}
            </button>

            {/* GOOGLE SIGN UP */}
            <div className="register__social">
              <span>Or Register with</span>
              <div className="register__social-icons">
                <img
                  src={googleIcon}
                  alt="google"
                  style={{ cursor: "pointer", width: "38px" }}
                  onClick={handleGoogleRegister}
                />
              </div>
            </div>

            <p className="register__footer">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

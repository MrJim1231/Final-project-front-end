import "./LoginPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/entities/user/model/userSlice";
import { RootState } from "@/app/providers/store";

// Icons
import { BsPersonFill, BsLockFill } from "react-icons/bs";

// Images
import backgroundPattern from "@/shared/assets/images/auth/background.png";
import loginImage from "@/shared/assets/images/auth/login-image.png";

import facebookIcon from "@/shared/assets/images/auth/facebook.png";
import googleIcon from "@/shared/assets/images/auth/google.png";
import xIcon from "@/shared/assets/images/auth/x-image.png";

export const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuth } = useSelector((state: RootState) => state.user);

  // 🔥 Если пользователь уже авторизован — отправляем на главную
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: form.username,
        password: form.password,
      });

      const { token, user } = res.data;

      // ================================
      //   📌 Remember me логика
      // ================================
      if (form.remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
      }

      // 🔥 Сохраняем в Redux
      dispatch(
        setUser({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
        })
      );

      // Очистка формы
      setForm({ username: "", password: "", remember: false });

      // Редирект
      navigate("/");
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
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
                autoComplete="username"
                onChange={handleChange}
                className="login__input"
                required
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
                autoComplete="current-password"
                required
              />
            </div>

            {/* Remember me */}
            <label className="login__checkbox">
              <input
                type="checkbox"
                name="remember"
                checked={form.remember}
                onChange={handleChange}
              />
              <span>Remember Me</span>
            </label>

            <button type="submit" className="login__btn" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>

            {/* Social Icons */}
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

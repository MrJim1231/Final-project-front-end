import "./LoginPage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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

// API
import { UserAPI } from "@/shared/api/apiUser";
import { setAuthToken } from "@/shared/api/api";

export const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const { isAuth } = useSelector((state: RootState) => state.user);

  // ============================
  // AUTO LOGIN AFTER GOOGLE
  // ============================
  useEffect(() => {
    const googleToken = params.get("googleToken");
    const userStr = params.get("user");

    console.log("🔵 [GOOGLE] raw token:", googleToken);
    console.log("🔵 [GOOGLE] raw user string:", userStr);

    if (googleToken && userStr) {
      try {
        const user = JSON.parse(userStr);

        console.log("🟣 [GOOGLE] parsed user:", user);
        console.log("🟣 [GOOGLE] user avatar:", user.avatar);

        // Сохраняем токен
        setAuthToken(googleToken);
        localStorage.setItem("token", googleToken);
        localStorage.setItem("user", JSON.stringify(user));

        // Диспатчим пользователя
        dispatch(
          setUser({
            id: user.id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            avatar: user.avatar || "", // ВАЖНО!
            token: googleToken,
          })
        );

        navigate("/");
      } catch (e) {
        console.error("Google login parse error:", e);
      }
    }
  }, [params, dispatch, navigate]);

  // redirect если уже вошёл
  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  // ============================
  // INPUT HANDLER
  // ============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ============================
  // LOGIN WITH PASSWORD
  // ============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await UserAPI.login({
        username: form.username,
        password: form.password,
      });

      const { token, user } = res.data;

      setAuthToken(token);

      // remember me
      if (form.remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        sessionStorage.setItem("token", token);
      }

      dispatch(
        setUser({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar || "",
          token,
        })
      );

      setForm({ username: "", password: "", remember: false });

      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // GOOGLE LOGIN CLICK
  // ============================
  const handleGoogleLogin = () => {
    console.log("🟢 Redirect to Google login…");
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div
      className="login__container"
      style={{ backgroundImage: `url(${backgroundPattern})` }}
    >
      <div className="login__card">
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
                required
                autoComplete="username"
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
                required
                autoComplete="current-password"
                className="login__input"
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

            {/* Social login */}
            <div className="login__social">
              <span>Or, Login with</span>
              <div className="login__social-icons">
                <img src={facebookIcon} alt="facebook" />

                <img
                  src={googleIcon}
                  alt="google"
                  style={{ cursor: "pointer" }}
                  onClick={handleGoogleLogin}
                />

                <img src={xIcon} alt="x" />
              </div>
            </div>

            <p className="login__footer">
              Don’t have an account? <Link to="/register">Create One</Link>
            </p>
          </form>
        </div>

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

import { useState } from "react";
import { loginAdmin } from "./../../Services/Models/admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import "./index.scss";

export default function Login() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const token = localStorage.getItem("adminToken");
  if (token) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin(password);
      if (res.token) {
        localStorage.setItem("adminToken", res.token);
        setRedirect(true);
      }
    } catch {
      setError("Invalid Password");
    }
  };

  if (redirect) return <Navigate to="/admin" replace />;

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Your Password"
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit">Login</button>
        {error && <p className="err">{error}</p>}
      </form>
    </div>
  );
}

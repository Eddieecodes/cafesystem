import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../config";
import "../../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    console.log("Login clicked");
    setLoading(true);
    e.preventDefault();
    const loginEmail = email;
    let endpoint;

    switch (role) {
      case "admin":
        endpoint = `${config.BASE_URL}/feedback/login`;
        break;
      case "staff":
        endpoint = `${config.BASE_URL}/auth/login`;
        break;
      default:
        endpoint = `${config.BASE_URL}/auth/login`;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: loginEmail, role, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        if (role === "admin") {
          localStorage.setItem("isAdmin", "true");
          navigate("/admin");
        } else if (role === "staff") {
          localStorage.setItem("isStaff", "true");
          navigate("/staff");
        } else {
          localStorage.setItem("isStudent", "true");
          navigate("/student");
        }
        toast.success("Login successful");
      } else {
        toast.error("Login failed. Please check your credentials.", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
      });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <div className="role-switch">
          <button
            className={role === "student" ? "active" : ""}
            onClick={() => setRole("student")}
          >
            Student
          </button>
          <button
            className={role === "admin" ? "admin-active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            className={role === "staff" ? "staff-active" : ""}
            onClick={() => setRole("staff")}
          >
            Staff
          </button>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{loading ? "Loading..." : "Login"}</button>
        </form>

        <p className="auth-toggle">
          Don't have an account? <Link to="/sign-up">Sign Up</Link>
        </p>
        <Link to="/forgot-password" className="forgot-password">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}

export default Login;

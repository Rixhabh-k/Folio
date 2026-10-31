import "../shared/global.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      const response = await handleLogin({ username, password });

      if (response.user.isProfileComplete) {
        navigate("/dashboard");
      } else {
        navigate("/complete-profile");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="auth-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="glass-card">
        <div className="brand">
          <div className="brand-icon">
            <span>✳</span>
          </div>
          <span className="brand-name">FOLIO</span>
        </div>

        <div className="auth-heading">
          <span className="eyebrow">
            <span className="status-dot" />
            GOOD TO HAVE YOU BACK
          </span>

          <h1>
            Welcome
            <br />
            back <span>again.</span>
          </h1>

          <p>
            Your space is waiting for you. Sign in and pick up right where you
            left off.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">USERNAME</label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button type="submit" className="register-btn" disabled={loading}>
            <span>{loading ? "Logging in..." : "Sign in to account"}</span>

            {!loading && <span className="btn-arrow">↗</span>}
          </button>
        </form>

        <div className="auth-footer">
          <span>New around here?</span>
          <Link to="/register">
            Create an account <span>↗</span>
          </Link>
        </div>

        <div className="recovery-links">
          <Link to="/forget-username">Forgot username?</Link>
          <Link to="/forget-password">Forgot password?</Link>
        </div>

        <div className="card-bottom">
          <span>© 2026 FOLIO</span>
          <span>
            <span className="footer-dot" />
            SECURE SIGN IN
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;

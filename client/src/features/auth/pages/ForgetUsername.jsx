
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../shared/global.css";
import { useAuth } from "../hooks/useAuth";

const ForgetUsername = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpEnabled, setOtpEnabled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    handleForgetUsername,
    handelForgetUsernameOtp,
    loading
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      if (!otpEnabled) {
        // First API call: Send OTP to email
        const response = await handleForgetUsername({ email });

        setOtpEnabled(true);
        setSuccess(
          response?.message || "OTP sent successfully. Please check your email."
        );

      } else {
        // Second API call: Verify OTP
        const response = await handelForgetUsernameOtp({
          email,
          otp
        });

        setSuccess(
          response?.message || "Username has been sent to your email."
        );
        setOtp("");
      }

    } catch (error) {
      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="forget-username-page">
      <div className="forget-username-card">

        <div className="recovery-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-1.8 3.12-.08-.02a1.7 1.7 0 0 0-1.7.47l-.06.06h-3.6l-.06-.06a1.7 1.7 0 0 0-1.7-.47l-.08.02-1.8-3.12.06-.06A1.7 1.7 0 0 0 9.3 15l-.08-.03v-3.94L9.3 11a1.7 1.7 0 0 0-.34-1.87l-.06-.06 1.8-3.12.08.02a1.7 1.7 0 0 0 1.7-.47l.06-.06h3.6l.06.06a1.7 1.7 0 0 0 1.7.47l.08-.02 1.8 3.12-.06.06A1.7 1.7 0 0 0 19.4 11l.08.03v3.94l-.08.03Z"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <span className="recovery-eyebrow">ACCOUNT RECOVERY</span>

        <h1>Forgot your username?</h1>

        <p className="recovery-description">
          {otpEnabled
            ? `We've sent a verification code to ${email}. Enter it below to recover your username.`
            : "Don't worry. Enter your registered email address and we'll send you an OTP to recover your username."}
        </p>

        {error && <p className="recovery-error">{error}</p>}
        {success && <p className="recovery-success">{success}</p>}

        <form onSubmit={handleSubmit}>

          <label htmlFor="recovery-email">Email address</label>

          <input
            id="recovery-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpEnabled || loading}
            required
          />

          <div className={`otp-field ${otpEnabled ? "otp-visible" : ""}`}>
            <label htmlFor="recovery-otp">Verification code</label>

            <input
              id="recovery-otp"
              type="text"
              inputMode="numeric"
              maxLength={4}
              placeholder="Enter 4-digit OTP"
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              disabled={!otpEnabled || loading}
              required={otpEnabled}
            />
          </div>

          <button
            type="submit"
            className="recovery-button"
            disabled={loading}
          >
            {loading
              ? otpEnabled
                ? "Verifying..."
                : "Sending..."
              : otpEnabled
                ? "Validate OTP"
                : "Send verification code"}
            <span>→</span>
          </button>

        </form>

        <div className="recovery-footer">
          Remember your username? <Link to="/login">Back to login</Link>
        </div>

      </div>
    </div>
  );
};

export default ForgetUsername;

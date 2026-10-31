
import '../shared/global.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/auth.service'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  const [status, setStatus] = useState(token ? 'loading' : 'error')
  const hasCalled = useRef(false)

  useEffect(() => {
    if (!token || hasCalled.current) return

    hasCalled.current = true

    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <main className="auth-page">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient ambient-three" />

      <section className="glass-card verification-card">
        <div className="brand">
          <div className="brand-icon">
            <span>✳</span>
          </div>
          <span className="brand-name">FOLIO</span>
        </div>

        {status === 'loading' && (
          <div className="verification-content">
            <div className="verification-icon loading-icon">
              <div className="loader-ring" />
              <span>✉</span>
            </div>

            <span className="eyebrow">
              <span className="status-dot" />
              ALMOST THERE
            </span>

            <h1 className="verification-title">
              Verifying your<br />
              <span>identity.</span>
            </h1>

            <p className="verification-description">
              We're checking your verification link.
              This will only take a moment.
            </p>

            <div className="verification-progress">
              <span />
            </div>

            <p className="verification-hint">
              Please keep this page open.
            </p>
          </div>
        )}

        {status === 'success' && (
          <div className="verification-content">
            <div className="verification-icon success-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5L10 17L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="eyebrow">
              <span className="success-dot" />
              VERIFICATION COMPLETE
            </span>

            <h1 className="verification-title">
              You're all<br />
              <span>verified.</span>
            </h1>

            <p className="verification-description">
              Your email address has been verified successfully.
              Your account is ready for you.
            </p>

            <button
              type="button"
              className="register-btn"
              onClick={() => navigate('/login')}
            >
              <span>Continue to login</span>
              <span className="btn-arrow">↗</span>
            </button>
          </div>
        )}

        {status === 'error' && (
          <div className="verification-content">
            <div className="verification-icon error-icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 8V13"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M12 17H12.01"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </div>

            <span className="eyebrow error-eyebrow">
              <span className="error-dot" />
              VERIFICATION UNSUCCESSFUL
            </span>

            <h1 className="verification-title">
              Link <span>expired.</span>
            </h1>

            <p className="verification-description">
              This verification link is invalid or has expired.
              Return to registration to continue.
            </p>

            <button
              type="button"
              className="register-btn"
              onClick={() => navigate('/register')}
            >
              <span>Back to registration</span>
              <span className="btn-arrow">↗</span>
            </button>
          </div>
        )}

        <div className="card-bottom">
          <span>© 2026 FOLIO</span>
          <span>
            <span className="footer-dot" />
            SECURE VERIFICATION
          </span>
        </div>
      </section>
    </main>
  )
}

export default VerifyEmail

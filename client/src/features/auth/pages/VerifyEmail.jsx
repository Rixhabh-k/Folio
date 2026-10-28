import '../shared/global.css'
import { useEffect, useRef, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../services/auth.service'

const VerifyEmail = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const navigate = useNavigate()

  // 'loading' | 'success' | 'error'
  const [status, setStatus] = useState(token ? 'loading' : 'error')

  // React StrictMode (dev) useEffect ko 2 baar chalata hai.
  // Token ek hi baar valid hota hai, isliye guard zaroori hai.
  const hasCalled = useRef(false)

  useEffect(() => {
    if (!token || hasCalled.current) return
    hasCalled.current = true

    verifyEmail(token)
      .then(() => setStatus('success'))
      .catch(() => setStatus('error'))
  }, [token])

  return (
    <div className="register">
      <div className="register-form">
        {status === 'loading' && (
          <h1 className="register-title">Verifying your email...</h1>
        )}

        {status === 'success' && (
          <>
            <h1 className="register-title">Email verified</h1>
            <p>Your account has been verified successfully.</p>
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate('/login')}
            >
              Go to login
            </button>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 className="register-title">Verification failed</h1>
            <p>This link is invalid or has expired.</p>
            <button
              type="button"
              className="register-btn"
              onClick={() => navigate('/register')}
            >
              Back to register
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail
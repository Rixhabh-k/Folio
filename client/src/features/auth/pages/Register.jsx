
import '../shared/global.css'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { handleRegister, loading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (loading) return

    try {
      await handleRegister({ username, email, password })
      navigate('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

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
            YOUR NEXT CHAPTER STARTS HERE
          </span>

          <h1>Create your<br />own <span>space.</span></h1>

          <p>
            Join the community. Create an account and
            make something extraordinary.
          </p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="username">USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="email">EMAIL ADDRESS</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">PASSWORD</label>
            <input
              id="password"
              type="password"
              placeholder="Minimum 8 characters"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            <span>
              {loading ? 'Creating account...' : 'Create account'}
            </span>

            {!loading && <span className="btn-arrow">↗</span>}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login">Sign in <span>↗</span></Link>
        </div>

        <div className="card-bottom">
          <span>© 2026 FOLIO</span>
          <span><span className="footer-dot" /> SECURE REGISTRATION</span>
        </div>
      </section>
    </main>
  )
}

export default Register

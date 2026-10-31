
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, handleLogout } = useAuth()

  const closeMenu = () => setMenuOpen(false)
  const isLoggedIn = Boolean(user)

  return (
    <header className="folio-navbar">
      <nav className="folio-nav-inner">
        <Link to="/" className="folio-brand" onClick={closeMenu}>
          <span className="folio-brand-icon">f.</span>
          <span>
            FOLIO<span className="folio-brand-dot">.</span>
          </span>
        </Link>

        <div className={`folio-nav-links ${menuOpen ? 'is-open' : ''}`}>
          <a href="/#features" onClick={closeMenu}>Features</a>
          <a href="/#preview" onClick={closeMenu}>Explore</a>
          <a href="/#how-it-works" onClick={closeMenu}>How it works</a>

          <div className="folio-mobile-actions">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  className="folio-nav-login"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  className="folio-nav-login"
                  onClick={() => {
                    closeMenu()
                    handleLogout()
                  }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="folio-nav-login"
                  onClick={closeMenu}
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="folio-nav-cta"
                  onClick={closeMenu}
                >
                  Get started <span>↗</span>
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="folio-nav-actions">
          {isLoggedIn ? (
            <Link
              to="/dashboard"
              className="folio-user-avatar"
              title="Open dashboard"
              aria-label="Open dashboard"
            >
              {user?.username?.charAt(0)?.toUpperCase() || 'U'}
            </Link>
          ) : (
            <>
              <Link to="/login" className="folio-nav-login">
                Log in
              </Link>

              <Link to="/register" className="folio-nav-cta">
                Get started <span>↗</span>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`folio-menu-toggle ${menuOpen ? 'active' : ''}`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </nav>
    </header>
  )
}

export default Navbar

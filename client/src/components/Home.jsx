
import { Link } from 'react-router-dom'
import Navbar from './Navbar'


const Home = () => {
  return (
    <main className="folio-home">
      <Navbar />

      <section className="folio-hero">
        <div className="folio-hero-glow" />
        <div className="folio-orb folio-orb-one" />
        <div className="folio-orb folio-orb-two" />

        <div className="folio-hero-content">
          <div className="folio-announcement">
            <span className="folio-live-dot" />
            YOUR ENTIRE WORLD, ONE LINK
            <span className="folio-announcement-arrow">↗</span>
          </div>

          <h1>
            Everything you are.
            <br />
            <span>One link.</span>
            Infinite possibilities.
          </h1>

          <p className="folio-hero-description">
            Your work, socials, projects and passions — all in one
            beautiful space. Create your personal corner of the internet
            with FOLIO.
          </p>

          <div className="folio-hero-actions">
            <Link to="/register" className="folio-primary-btn">
              Create your FOLIO <span>↗</span>
            </Link>

            <a href="#preview" className="folio-secondary-btn">
              <span className="folio-play-icon">▷</span>
              See the experience
            </a>
          </div>

          <div className="folio-social-proof">
            <div className="folio-avatar-stack">
              <span>R</span>
              <span>A</span>
              <span>K</span>
              <span>+</span>
            </div>
            <p>
              <strong>Your identity, your rules.</strong>
              <br />
              One simple link. Endless ways to express yourself.
            </p>
          </div>
        </div>

        <div className="folio-hero-visual" id="preview">
          <div className="folio-visual-glow" />

          <div className="folio-floating-label folio-label-top">
            <span className="folio-label-icon">✳</span>
            <div>
              <strong>One link.</strong>
              <small>Your whole world.</small>
            </div>
          </div>

          <div className="folio-profile-card">
            <div className="folio-profile-cover">
              <div className="folio-cover-orb" />
              <span className="folio-cover-label">CREATIVE SPACE / 001</span>
            </div>

            <div className="folio-profile-body">
              <div className="folio-profile-avatar">R</div>

              <div className="folio-profile-identity">
                <h3>Rishabh K.</h3>
                <span>@rishabhcreates <span className="folio-verified">✦</span></span>
              </div>

              <p className="folio-profile-bio">
                Developer, creator &amp; curious mind.
                <br />
                Building things for the internet.
              </p>

              <div className="folio-profile-socials">
                <span>GH</span>
                <span>in</span>
                <span>◎</span>
                <span>𝕏</span>
              </div>

              <a href="#features" className="folio-profile-link">
                <span className="folio-link-symbol">⌘</span>
                <span>
                  <strong>My Portfolio</strong>
                  <small>Selected work &amp; experiments</small>
                </span>
                <span className="folio-link-arrow">↗</span>
              </a>

              <a href="#features" className="folio-profile-link">
                <span className="folio-link-symbol">◈</span>
                <span>
                  <strong>Latest Project</strong>
                  <small>Things I'm building</small>
                </span>
                <span className="folio-link-arrow">↗</span>
              </a>

              <a href="#features" className="folio-profile-link">
                <span className="folio-link-symbol">✳</span>
                <span>
                  <strong>Let's Connect</strong>
                  <small>Say hello, anytime</small>
                </span>
                <span className="folio-link-arrow">↗</span>
              </a>

              <div className="folio-profile-footer">
                MADE WITH <span>♥</span> USING FOLIO
              </div>
            </div>
          </div>

          <div className="folio-floating-label folio-label-bottom">
            <span className="folio-label-check">✓</span>
            <div>
              <strong>All connected.</strong>
              <small>One home for everything.</small>
            </div>
          </div>
        </div>

        <div className="folio-scroll-cue">
          <span />
          SCROLL TO EXPLORE
        </div>
      </section>

      <section className="folio-features" id="features">
        <div className="folio-section-heading">
          <span className="folio-section-eyebrow">LESS SCATTER. MORE YOU.</span>
          <h2>Your internet, <span>in one place.</span></h2>
          <p>
            Stop sending people everywhere. Give them one link
            that tells your whole story.
          </p>
        </div>

        <div className="folio-feature-grid">
          <article className="folio-feature-card">
            <div className="folio-feature-icon violet">↗</div>
            <h3>One link. Everything.</h3>
            <p>
              Bring your portfolio, socials, projects and favorite
              destinations together in one shareable page.
            </p>
            <span className="folio-feature-index">01 / CONNECT</span>
          </article>

          <article className="folio-feature-card">
            <div className="folio-feature-icon cyan">◈</div>
            <h3>Made to feel like you.</h3>
            <p>
              Build a personal page that reflects your style,
              your work and the identity you want to share.
            </p>
            <span className="folio-feature-index">02 / CREATE</span>
          </article>

          <article className="folio-feature-card">
            <div className="folio-feature-icon pink">✳</div>
            <h3>Share it everywhere.</h3>
            <p>
              Put your FOLIO link in your bio, resume, portfolio
              or messages. One destination, easy access.
            </p>
            <span className="folio-feature-index">03 / SHARE</span>
          </article>
        </div>
      </section>

      <section className="folio-bottom-cta" id="how-it-works">
        <span className="folio-section-eyebrow">YOUR SPACE IS WAITING</span>
        <h2>Make the internet<br />feel a little more <span>you.</span></h2>
        <p>Start with one link. Make it your own.</p>
        <Link to="/register" className="folio-primary-btn">
          Create your FOLIO <span>↗</span>
        </Link>
      </section>

      <footer className="folio-footer">
        <Link to="/" className="folio-brand">
          <span className="folio-brand-icon">f.</span>
          <span>FOLIO<span className="folio-brand-dot">.</span></span>
        </Link>
        <span>YOUR SPACE. YOUR STORY.</span>
        <span>© 2026 FOLIO</span>
      </footer>
    </main>
  )
}

export default Home

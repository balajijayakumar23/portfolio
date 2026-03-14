import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="portfolio">
      <header className="site-header">
        <div className="logo"><span className="name-accent">balaji</span>jayakumar.</div>
        <div className="header-right">
          <a href="#" className="nav-link">Resume</a>
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
            <div className="toggle-track">
              <div className="toggle-thumb">
                {theme === 'light' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="moon-icon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </div>
            </div>
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero-section">
          <h1><span className="name-accent">I'm Balaji,</span> a Salesforce professional<br className="desktop-br" />dedicated to building efficient<br className="desktop-br" />business solutions.</h1>
          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/balaji-jayakumar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.salesforce.com/trailblazer/bjayakumar" target="_blank" rel="noopener noreferrer">Trailhead</a>
            <a href="mailto:your.email@example.com">Email</a>
          </div>
        </section>

        <section id="about">
          <h2>About Me</h2>
          <div className="about-content">
            <p>I am a 3x Salesforce certified professional with hands-on experience in the Salesforce platform since 2020. I am passionate about driving efficiency and solving complex business challenges.</p>
            <p>I focus on delivering high-impact solutions through data management, stakeholder engagement, and process improvement. My certifications include Salesforce Administrator, Business Analyst and Agentforce Specialist.</p>
            <p>Outside of Salesforce, my interests include food, travel, personal finance and badminton.</p>
          </div>
        </section>

        <section id="experience">
          <h2>My Experience</h2>
          
          <div className="experience-item">
            <div className="exp-header">
              <span className="exp-company">
                <a href="https://www.hometogo.de/" target="_blank" rel="noopener noreferrer">HomeToGo GmbH</a>
              </span>
              <span className="exp-date">July 2022 - Present</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="exp-header">
              <span className="exp-company">
                <a href="https://www.team-neusta.de/en" target="_blank" rel="noopener noreferrer">team neusta</a>
              </span>
              <span className="exp-date">June 2020 - March 2022</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="exp-header">
              <span className="exp-company">
                <a href="https://openasapp.com/" target="_blank" rel="noopener noreferrer">Open as App GmbH</a>
              </span>
              <span className="exp-date">August 2018 - May 2020</span>
            </div>
          </div>

          <div className="experience-item">
            <div className="exp-header">
              <span className="exp-company">
                <a href="https://www.cognizant.com/us/en" target="_blank" rel="noopener noreferrer">Cognizant</a>
              </span>
              <span className="exp-date">January 2016 - September 2017</span>
            </div>
          </div>
        </section>

        <section id="works">
          <h2>Selected Works</h2>
          <div className="works-grid">
            <div className="work-item">
              <h3>Dunning Process Automation</h3>
              <p>Reduced reconciliation time by 30% through custom Salesforce automation.</p>
              <div className="work-tags">
                <span>Salesforce</span>
                <span>Flows</span>
                <span>Automation</span>
              </div>
            </div>
            <div className="work-item">
              <h3>Multi-language Service Bots</h3>
              <p>Implemented AI-driven Einstein bots to enhance customer support.</p>
              <div className="work-tags">
                <span>Einstein Bots</span>
                <span>Service Cloud</span>
                <span>AI</span>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Salesforce</h3>
              <div className="skill-list">
                Sales Cloud, Service Cloud, Account Engagement (Pardot), Sales Engagement, Agentforce, Flows, Configuration, Data Management.
              </div>
            </div>
            <div className="skill-category">
              <h3>Business Analysis</h3>
              <div className="skill-list">
                Agile, Scrum, Requirements Gathering, Stakeholder Management, User Stories, UAT, Process Mapping.
              </div>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <div className="skill-list">
                Slack, Jira, Confluence, Miro, Salesforce Inspector Reloaded.
              </div>
            </div>
          </div>
        </section>

        <section id="certifications">
          <h2>Certifications</h2>
          <div className="certs-list">
            <div className="cert-item">Salesforce Certified Agentforce Specialist</div>
            <div className="cert-item">Salesforce Certified Business Analyst</div>
            <div className="cert-item">Salesforce Certified Administrator</div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="cta">
          <h2>Stay connected w/ me.</h2>
          <a href="mailto:your.email@example.com" className="cta-link">Let's Connect →</a>
        </div>
        <div className="footer-bottom">
          <div className="footer-socials">
            <a href="https://www.linkedin.com/in/balaji-jayakumar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.salesforce.com/trailblazer/bjayakumar" target="_blank" rel="noopener noreferrer">Trailhead</a>
          </div>
          <p className="copyright">© 2026 BALAJI JAYAKUMAR.</p>
        </div>
      </footer>
    </div>
  )
}

export default App

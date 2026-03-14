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
      <header>
        <div className="hero">
          <h1>Balaji<br />Jayakumar</h1>
          <p>3x Salesforce Certified Professional driving efficiency and solving complex business challenges.</p>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>

      <section id="about">
        <h2>About Me</h2>
        <div className="about-content">
          <p>Hello! My name is Balaji, and I am a 3x Salesforce certified professional with hands-on experience in the Salesforce platform since 2020. I am passionate about driving efficiency and solving complex business challenges.</p>
          <p>I began my Salesforce journey in 2020 and have since gained valuable skills in the areas of data management, stakeholder engagement, and process improvement. My certifications include Salesforce Administrator, Business Analyst and Agentforce Specialist.</p>
          <p>Outside of Salesforce, my interests include food, travel, personal finance and badminton.</p>
        </div>
      </section>

      <section id="experience">
        <h2>Experience</h2>
        
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

      <section id="certifications">
        <h2>Certifications</h2>
        <div className="certs-list">
          <div className="cert-item">Salesforce Certified Agentforce Specialist</div>
          <div className="cert-item">Salesforce Certified Business Analyst</div>
          <div className="cert-item">Salesforce Certified Administrator</div>
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

      <footer>
        <div className="contact-links">
          <a href="mailto:your.email@example.com">Email</a>
          <a href="https://www.linkedin.com/in/balaji-jayakumar/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/balajijayakumar23" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <p>© 2026 Balaji Jayakumar</p>
      </footer>
    </div>
  )
}

export default App

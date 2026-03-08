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
            <span className="exp-company">HomeToGo GmbH</span>
            <span className="exp-date">July 2022 - Present</span>
          </div>
          <span className="exp-role">Salesforce Business Analyst & Administrator</span>
          <ul className="exp-bullets">
            <li>Analyzing and documenting business processes, identifying areas for improvement.</li>
            <li>Leading the implementation of a new dunning process, reducing reconciliation time by 30%.</li>
            <li>Managing Salesforce user permissions, profiles, and roles to ensure data security.</li>
            <li>Customizing Salesforce fields, page layouts, and reports to align with business needs.</li>
          </ul>
        </div>

        <div className="experience-item">
          <div className="exp-header">
            <span className="exp-company">abtis Business Solutions GmbH</span>
            <span className="exp-date">June 2020 - March 2022</span>
          </div>
          <span className="exp-role">Salesforce Administrator</span>
          <ul className="exp-bullets">
            <li>Gathered and analyzed client requirements, enhancing service delivery by 20%.</li>
            <li>Led the deployment of multi-language Service Cloud Einstein bots.</li>
            <li>Designed and customized Salesforce Lightning pages and components.</li>
            <li>Configured and managed Salesforce automation tools (Flows).</li>
          </ul>
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

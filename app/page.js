'use client';

import { useState } from 'react';
import Link from 'next/link';

// Custom Components from /components
import ArrowIcon from '@/components/ArrowIcon';
import NavigationBar from '@/components/NavigationBar';

export default function LandingPage() {
  // Track selected role for email signup form (`user` | `developer` | `both`)
  const [selectedRole, setSelectedRole] = useState('user');

  // Role options displayed in the "Stay in the loop" signup section
  const roleOptions = [
    { label: 'User / Business', value: 'user' },
    { label: 'Developer / Builder', value: 'developer' },
    { label: 'Both', value: 'both' },
  ];

  // Track selected category for feedback form (`Pain point` | `Feature idea` | `Use case` | `Other`)
  // NOT CURRENTLY IN USE (FEEDBACK IMPLEMENTED LATER)
  const [selectedCategory, setSelectedCategory] = useState('Pain point');

  // Category options displayed in the "Tell us what you need" section
  // NOT CURRENTLY IN USE (FEEDBACK IMPLEMENTED LATER)
  const categories = ['Pain point', 'Feature idea', 'Use case', 'Other'];

  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');

  // Feedback form state
  // NOT CURRENTLY IN USE (FEEDBACK IMPLEMENTED LATER)
  const [feedback, setFeedback] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');

  // Status state, indicating the status of e-mail submission
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  const consumerFeatures = [
    "Rate whether the agent completed your task, and how well it did",
    "Score your satisfaction with accuracy, speed, and overall behavior",
    "Leave free-form feedback describing your experience in your own words",
    "Attach the agent's execution trace to give developers full context",
    "Browse reviews from others before integrating an agent into your workflow"
  ];

  const developerFeatures = [
    "Track LLM calls, token usage, and cost-per-run across your agent",
    "Monitor tool call success rates and pinpoint where agents break down",
    "View full execution traces tied to specific user-submitted reviews",
    "Framework-specific views: filter by LangChain, CrewAI, AutoGen, and more",
    "Connect quantitative performance data directly to human satisfaction scores"
  ]

  const frameworks = [
    { name: "LangChain", color: "#1AA260" },
    { name: "CrewAI", color: "#7C3AED" },
    { name: "AutoGen", color: "#0EA5E9" },
    { name: "OpenAI Swarm", color: "#F59E0B" }
  ]

  // The console.log statements are placeholders to showcase accessing the state variables `signupEmail` and `selectedRole`
  // (if you run the app, and open the console in developer tools, you should see the email and selectedRole printed). 
  // Eventually, when the database is being integrated, this is where we would trigger sending data to the database.
  // Depending on the result of adding data to the database, we should indicate a succes or error message to the user.
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Email:", signupEmail);
      console.log("Role:", selectedRole);
      setStatus('success')
    } catch (error) {
      setStatus('error')
    }
  };

  return (
    <>
      <NavigationBar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            In development — follow along
          </div>
          <h1>Performance reviews<br />for your <em>AI workforce</em></h1>
          <p className="hero-sub">Combining real human feedback with hard quantitative data, ReviewMyAgent gives you a complete picture of how an AI agent actually performs.</p>
          <div className="hero-actions">
            <a href="#connect" className="btn-primary">Get updates<ArrowIcon /></a>
            <a href="#audiences" className="btn-secondary">Learn more</a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Consumer vs. Developer Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto' }}>
            <div className="section-eyebrow">Two perspectives, one platform</div>
            <div className="section-title">
              Built for the people who use agents,<br />and the people who build them
            </div>
          </div>
          <div className="audience-split reveal">

            {/* Consumer */}
            <div className="audience-card consumer">
              <div className="audience-tag consumer">
                <span className="tag-pip c" /> For Users &amp; Businesses
              </div>
              <h3>Your experience<br />shapes the future</h3>
              <p>
                You use AI agents every day. Your feedback is the most valuable signal
                a developer can get — and now there's a structured way to give it.
              </p>
              <ul className="feature-list">
                {/* .map here iterates over the strings in consumerFeatures and creates 'consumerFeatures.length' (5) list elements */}
                {consumerFeatures.map((feature, index) => (
                  <li className="feature-item" key={index}>
                    <div className="fi-check c">✓</div>
                    <div>{feature}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer */}
            <div className="audience-card developer" id="developers">
              <div className="audience-tag developer">
                <span className="tag-pip d" /> For Developers &amp; Builders
              </div>
              <h3>Metrics that tell<br />the whole story</h3>
              <p>
                Surface-level evals aren't enough. See exactly how your agents run —
                from LLM call costs to tool failures — correlated with real user satisfaction.
              </p>
              <ul className="feature-list">
                {/* .map here iterates over the strings in developerFeatures and creates 'developerFeatures.length' (5) list elements */}
                {developerFeatures.map((feature, index) => (
                  <li className="feature-item" key={index}>
                    <div className="fi-check d">✓</div>
                    <div>{feature}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Integrated Frameworks */}
      <div className="frameworks">
        <div className="container">
          <div className="frameworks-label">Designed for popular agent frameworks</div>
          <div className="framework-pills">
            {/* .map here iterates over the objects in frameworks and creates 'frameworks.length' (4) framework pill elements */}
            {frameworks.map(({name, color}) => (
              <div className="framework-pill" key={name}>
                <div className="fp-dot" style={{ background: color }} />{name}
              </div>
            ))}

            <div className="framework-pill" style={{ opacity: 0.5 }}>
              <div className="fp-dot" style={{ background: 'var(--text-dim)' }} />
              More to come
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Stay In The Loop */}
      <section className="loop-section" id="connect">
        <div className="container">
          <div className="loop-header reveal">
            <div className="section-eyebrow">Stay involved</div>
            <div className="section-title">Follow the build & help shape the platform</div>
            <p>
              ReviewMyAgent is actively in development. Sign up for occasional progress
              updates, or share your pain points and ideas — we're building this with
              real users in mind.
            </p>
          </div>

            {/* Sign-up For Updates */}
            <div className="loop-panel">
              <div className="loop-panel-tag">📬 Get Updates</div>
              <h3>Stay in the loop</h3>
              <p>
                We'll send occasional updates as we hit milestones with meaningful 
                progress on what we're building and a heads up for major feature updates.
              </p>
              <form onSubmit={handleSignupSubmit} className="loop-form">
                <input className="loop-input" type="email" placeholder="your@email.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}/>
                <div>
                  <div className="chip-label">I am a...</div>
                  <div className="loop-role-row">
                    {roleOptions.map(({ label, value }) => (
                      <button key={value} className={`role-chip ${selectedRole === value ? `sel-${value}` : ''}`} onClick={() => setSelectedRole(value)}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <button type="submit" className="loop-btn">
                  Notify me
                </button>
                <div className="loop-note">No account needed. Unsubscribe any time.</div>
              </form>
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <Link href="#" className="logo" style={{ fontSize: '16px' }}>ReviewMyAgent</Link>
            <div className="footer-copy">© 2026 Gentle Systems</div>
          </div>
        </div>
      </footer>
    </>
  );
}
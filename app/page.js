'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  // In the 'Stay in the loop' section, a user can indicate that
  // they are either a user/business, a developer/builder, or both.
  const [selectedRole, setSelectedRole] = useState('sel-c'); // 'sel-c' | 'sel-d' | 'sel-b'

  // selectedRole holds the currently selected role chip value, setSelectedRole updates 
  // it when a different chip is clicked; defaults to 'sel-c' (User / Business).
  const [selectedCat, setSelectedCat] = useState('Pain point');

  // Scroll reveal + nav highlight (highlights what section you are at in the navigation bar)
  useEffect(() => {
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    reveals.forEach((el) => observer.observe(el));

    // Nav scroll highlight
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav .nav-link');
    const handleScroll = () => {
      let current = '';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinks.forEach((l) => {
        l.style.color =
          l.getAttribute('href') === '#' + current ? 'var(--text)' : '';
      });
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // `roleChips` indicate the type of role a user can select when signing up for
  // update notifications. These options are seen in the 'Stay in the loop' section.
  const roleChips = [
    { label: 'User / Business', cls: 'sel-c' },
    { label: 'Developer / Builder', cls: 'sel-d' },
    { label: 'Both', cls: 'sel-b' },
  ];

  // `categories` indicate the category of feedback submitted under the
  // 'Tell us what you need' section.
  const categories = ['Pain point', 'Feature idea', 'Use case', 'Other'];

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <div className="container">
          <div className="nav-inner">
            <Link href="#" className="logo">ReviewMyAgent</Link>
            <div className="nav-links">
              <a href="#audiences" className="nav-link">Features</a>
              <a href="#how" className="nav-link">How It Works</a>
              <a href="#connect" className="btn-nav">Stay Updated</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow">
            <span className="eyebrow-dot"></span>
            In development — follow along
          </div>
          <h1>Performance reviews<br />for your <em>AI workforce</em></h1>
          <p className="hero-sub">ReviewMyAgent combines real human feedback with hard quantitative data, giving you a complete picture of how an AI agent actually performs.</p>
          <div className="hero-actions">
            <a href="#connect" className="btn-primary">Get updates<ArrowIcon /></a>
            <a href="#audiences" className="btn-secondary">Learn more</a>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Integrated Frameworks */}
      <div className="frameworks">
        <div className="container">
          <div className="frameworks-label">Built with popular agent frameworks in mind</div>
          <div className="framework-pills">
            {[
              { name: 'LangChain', color: '#1AA260' },
              { name: 'LangGraph', color: '#FF7A00' },
              { name: 'CrewAI', color: '#7C3AED' },
              { name: 'AutoGen', color: '#0EA5E9' },
              { name: 'OpenAI Swarm', color: '#F59E0B' },
              { name: 'LlamaIndex', color: '#EC4899' },
            ].map((f) => (
              <div key={f.name} className="framework-pill">
                <div className="fp-dot" style={{ background: f.color }} />
                {f.name}
              </div>
            ))}
            <div className="framework-pill" style={{ borderStyle: 'dashed', opacity: 0.5 }}>
              <div className="fp-dot" style={{ background: 'var(--text-dim)' }} />
              More to come
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Consumer vs. Developer Features */}
      <section className="section" id="audiences">
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
                a developer can get — and now there&apos;s a structured way to give it.
              </p>
              <ul className="feature-list">
                {[
                  'Rate whether the agent completed your task, and how well it did',
                  'Score your satisfaction with accuracy, speed, and overall behavior',
                  'Leave free-form feedback describing your experience in your own words',
                  "Attach the agent's execution trace to give developers full context",
                  'Browse reviews from others before integrating an agent into your workflow',
                ].map((text) => (
                  <li key={text} className="feature-item">
                    <div className="fi-check c">✓</div>
                    <div>{text}</div>
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
                Surface-level evals aren&apos;t enough. See exactly how your agents run —
                from LLM call costs to tool failures — correlated with real user satisfaction.
              </p>
              <ul className="feature-list">
                {[
                  'Track LLM calls, token usage, and cost-per-run across your agent',
                  'Monitor tool call success rates and pinpoint where agents break down',
                  'View full execution traces tied to specific user-submitted reviews',
                  'Framework-specific views: filter by LangChain, LangGraph, CrewAI, and more',
                  'Connect quantitative performance data directly to human satisfaction scores',
                ].map((text) => (
                  <li key={text} className="feature-item">
                    <div className="fi-check d">✓</div>
                    <div>{text}</div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* How The Platform Works */}
      <section className="section" id="how">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', maxWidth: '520px', margin: '0 auto' }}>
            <div className="section-eyebrow">Process</div>
            <div className="section-title">How ReviewMyAgent works</div>
          </div>
          <div className="how-steps reveal">
            <div className="step-card">
              <div className="step-num">01</div>
              <span className="step-icon">💬</span>
              <h4>Placeholder</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="step-card" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
              <div className="step-num">02</div>
              <span className="step-icon">💬</span>
              <h4>Placeholder</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <span className="step-icon">💬</span>
              <h4>Placeholder</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Stay In The Loop / Provide Feedback */}
      <section className="loop-section" id="connect">
        <div className="container">
          <div className="loop-header reveal">
            <div className="section-eyebrow">Stay involved</div>
            <div className="section-title">Follow the build &amp; help shape the platform</div>
            <p>
              ReviewMyAgent is actively in development. Sign up for occasional progress
              updates, or share your pain points and ideas — we&apos;re building this with
              real users in mind.
            </p>
          </div>

          <div className="loop-grid reveal">

            {/* Sign-up For Updates */}
            <div className="loop-panel">
              <div className="loop-panel-tag">📬 &nbsp;Get Updates</div>
              <h3>Stay in the loop</h3>
              <p>
                We&apos;ll send occasional updates as we hit milestones — no spam, no noise.
                Just meaningful progress on what we&apos;re building.
              </p>
              <div className="loop-form">
                <input className="loop-input" type="email" placeholder="your@email.com" />
                <div>
                  <div className="chip-label">I am a...</div>
                  <div className="loop-role-row">
                    {roleChips.map(({ label, cls }) => (
                      <button
                        key={cls}
                        className={`role-chip ${selectedRole === cls ? cls : ''}`}
                        onClick={() => setSelectedRole(cls)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                {/* This button will eventually need an onClick attribute to handle database interaction once that is integrated */}
                <button className="loop-btn">Notify me <ArrowIcon /></button>
                <div className="loop-note">No account needed. Unsubscribe any time.</div>
              </div>
            </div>

            {/* Provide Suggestions */}
            <div className="suggest-panel">
              <div className="loop-panel-tag">💡 &nbsp;Share Feedback</div>
              <h3>Tell us what you need</h3>
              <p>
                Using AI agents today and running into problems? Share your real pain
                points and feature ideas — this is your chance to directly influence
                what we build.
              </p>
              <div className="suggest-form">
                <div>
                  <div className="chip-label">Category</div>
                  <div className="suggest-category">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`cat-chip ${selectedCat === cat ? 'sel' : ''}`}
                        onClick={() => setSelectedCat(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  className="suggest-textarea"
                  placeholder="Describe your experience with AI agents today, what's broken, or a feature you'd want to see..."
                />
                <input
                  className="loop-input"
                  type="email"
                  placeholder="Email (optional — only if you'd like a reply)"
                />
                {/* Similar to the button above, this will also eventually need an onClick attribute to handle database interaction once that is integrated */}
                <button className="suggest-btn">Submit feedback <ArrowIcon /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <Link href="#" className="logo" style={{ fontSize: '17px' }}>
              <div className="logo-mark" style={{ width: '26px', height: '26px' }}>
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2L14 5.5V10.5L8 14L2 10.5V5.5L8 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
                  <circle cx="8" cy="8" r="2" fill="white" />
                </svg>
              </div>
              ReviewMyAgent
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

// Arrow icon
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
'use client';

import { useState } from 'react';

// Custom Components from '/components'
import { SignUpForm, SuccessMessage, ErrorMessage } from '@/components/Forms';
import ArrowIcon from '@/components/ArrowIcon';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';
import FeaturesCard from '@/components/FeaturesCard';
import { supabase } from './lib/supabaseClient';

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
  const [status, setStatus] = useState('idle');
  const [statusMsg, setStatusMsg] = useState('');

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

  // This function handles submitting the e-mail entered into the input form to the database.
  // Currently the Supabase database is not integrated, so as a placeholder, the e-mail
  // and role are logged to the console. Statuses should still work in a similar way.
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

  // Send to supabase, check email format, add to table
  async function notifyMe() {
    setStatus('loading')
    if (!signupEmail) {
      setStatus('error');
      setStatusMsg('Please enter your email.');
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signupEmail)) {
      console.log("Invalid email format");
      setStatus('error');
      setStatusMsg('Please enter a valid email address.');
      return
    }
    const { error } = await supabase 
      .from('emails')
        .insert([{ email: signupEmail, role: selectedRole }])
    if (error) {
      setStatus('error');
      setStatusMsg(error.message);
    } else {
      setStatus('success');
      setStatusMsg('Awesome! You are now connected!');
    } 
  }

  return (
    <>
      <NavigationBar />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-eyebrow"> <span className="eyebrow-dot"/>In development — follow along </div>
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
          <div style={{ textAlign: 'center', maxWidth: '620px', margin: '0 auto' }}>
            <div className="section-eyebrow">Two perspectives, one platform</div>
            <div className="section-title">
              Built for the people who use agents,<br />and the people who build them
            </div>
          </div>
          <div className="audience-split">
            <FeaturesCard 
              type="consumer" 
              tag="For Users & Businesses" 
              title={<>Your experience<br />shapes the future</>} 
              description="You use AI agents every day. Your feedback is the most valuable signal a developer can get. Now there's a structured way to give it."
              features={consumerFeatures}
            />

            <FeaturesCard
              type="developer"
              tag="For Developers & Builders"
              title={<>Metrics that tell<br />the whole story</>}
              description="Surface-level evals aren't enough. Correlated with real user satisfaction, see exactly how your agents run.."
              features={developerFeatures}
            />
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

          <div className="loop-panel">
            { status === null &&
              <SignUpForm 
                signupEmail={signupEmail} 
                setSignupEmail={setSignupEmail} 
                roleOptions={roleOptions} 
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
                handleSignupSubmit={handleSignupSubmit}
              />
            }

            { status === 'success' && <SuccessMessage signupEmail={signupEmail} /> }

            { status === 'error' && <ErrorMessage onRetry={() => setStatus(null)} /> }
          <div className="loop-grid reveal">

            {/* Sign-up For Updates */}
            <div className="loop-panel">
              <div className="loop-panel-tag">📬 Get Updates</div>
              <h3>Stay in the loop</h3>
              <p>
                We'll send occasional updates as we hit milestones — no spam, no noise.
                Just meaningful progress on what we're building.
              </p>
              <div className="loop-form">
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
                <button className="loop-btn" 
                  disabled={status === 'loading' || status === 'success'}
                  onClick={async () => {
                    // The console.log statements are placeholders to showcase accessing the state variables `email` and `selectedRole`
                    // (if you run the app, and open the console in developer tools, you should see the email and selectedRole printed). 
                    // Eventually, when the database is being integrated, this is where we would trigger sending data to the database.
                    // Depending on the result of adding data to the database, we should indicate a succes or error message to the user.
                    console.log("Email:", signupEmail);
                    console.log("Role:", selectedRole);
                    await notifyMe();
                    }}
                >
                  Notify me<ArrowIcon />
                </button>
                {status === 'success' && (
                <div className="loop-note" style={{ color: 'green' }}>{statusMsg}</div>
                )}
                {status === 'error' && (
                <div className="loop-note" style={{ color: 'red' }}>{statusMsg}</div>
                )}
                <div className="loop-note">No account needed. Unsubscribe any time.</div>
              </div>
            </div>

            {/* Provide Suggestions */}
            <div className="suggest-panel">
              <div className="loop-panel-tag">💡 Share Feedback</div>
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
                      <button key={cat} className={`cat-chip ${selectedCategory === cat ? 'sel' : ''}`} onClick={() => setSelectedCategory(cat)}>
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  className="suggest-textarea"
                  placeholder="Describe your experience with AI agents today, what's broken, or a feature you'd want to see..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <input
                  className="loop-input"
                  type="email"
                  placeholder="Email (optional — only if you'd like a reply)"
                  value={feedbackEmail}
                  onChange={(e) => setFeedbackEmail(e.target.value)}
                />
                <button className="suggest-btn" onClick={() => {
                  // The console.log statements are placeholders to showcase accessing the state variables `selectedCategory`, `feedback`,
                  // and `feedbackEmail` (if you run the app, and open the console in developer tools, you should see the email and selectedRole printed). 
                  // Eventually, when the database is being integrated, this is where we would trigger sending data to the database.
                  // Depending on the result of adding data to the database, we should indicate a succes or error message to the user.
                  console.log("Category:", selectedCategory);
                  console.log("Feedback:", feedback);
                  console.log("Email (optional):", feedbackEmail);
                }}
                >
                  Submit feedback<ArrowIcon />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabaseClient';
import useScrollFade from './hooks/useScrollFade';

import Footer from '@/components/Footer';

export default function PlatformPage() {
  //auth variable for page
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const recaptchaRef = useRef(null);

  // Password rules: 8+ chars, starts with capital, ends with special char
  const PASSWORD_RULES = [
    { label: 'be at least 8 characters', display: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'start with a capital letter', display: 'Starts with a capital letter', test: (p) => /^[A-Z]/.test(p) },
    { label: 'end with a special character (!@#$%^&*)', display: 'Ends with a special character (!@#$%^&*)', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]$/.test(p) },
  ];

  const validatePassword = (p) => PASSWORD_RULES.every(r => r.test(p));

  // Email must match full RFC-style format (no fake domains blocked by pattern)
  const validateEmail = (em) => /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/.test(em.trim());

  //recaptcha test key from google
  const RECAPTCHA_SITE_KEY = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

  //check if user login when page start
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  //load recaptcha script when modal open
  useEffect(() => {
    if (!showSignUp) {
      setCaptchaVerified(false);
      return;
    }

    window.onRecaptchaSuccess = () => setCaptchaVerified(true);
    window.onRecaptchaExpired = () => setCaptchaVerified(false);

    const renderCaptcha = () => {
      if (recaptchaRef.current && window.grecaptcha && window.grecaptcha.render) {
        //clear old widget away
        recaptchaRef.current.innerHTML = '';
        try {
          window.grecaptcha.render(recaptchaRef.current, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme: 'dark',
            callback: 'onRecaptchaSuccess',
            'expired-callback': 'onRecaptchaExpired',
          });
        } catch (e) {
          //widget maybe render already
        }
      }
    };

    //check if script load already
    if (window.grecaptcha && window.grecaptcha.render) {
      //wait small time for dom
      setTimeout(renderCaptcha, 100);
    } else {
      //load script for recaptcha
      const existing = document.querySelector('script[src*="recaptcha"]');
      if (!existing) {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit';
        script.async = true;
        script.defer = true;
        window.onRecaptchaLoad = renderCaptcha;
        document.head.appendChild(script);
      } else {
        setTimeout(renderCaptcha, 300);
      }
    }

    return () => {
      //delete global callback
      delete window.onRecaptchaSuccess;
      delete window.onRecaptchaExpired;
    };
  }, [showSignUp]);

  //function for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    const username = e.target.querySelector('#signup-name').value;
    const email = e.target.querySelector('#signup-email').value;
    const password = e.target.querySelector('#signup-password').value;
    const confirmPassword = e.target.querySelector('#signup-confirm-password').value;

    // Validate email format
    if (!validateEmail(email)) {
      setAuthError('Please enter a valid email address (e.g. you@company.com).');
      setAuthLoading(false);
      return;
    }

    // Validate password rules
    if (!validatePassword(password)) {
      const failed = PASSWORD_RULES.filter(r => !r.test(password)).map(r => r.label);
      setAuthError('Password must: ' + failed.join(', ') + '.');
      setAuthLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setAuthError('Passwords do not match.');
      setAuthLoading(false);
      return;
    }

    // Store username in auth metadata — this always works regardless of DB table state
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, email },
      },
    });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
      return;
    }
    if (data.user) {
      try {
        await supabase
          .from('profiles')
          .upsert({ id: data.user.id, username, email }, { onConflict: 'id' });
      } catch (_) {
        // Non-blocking — auth account is already created above
      }
    }

    setPasswordValue('');
    setAuthLoading(false);
    setShowSignUp(false);
  };

  //function for sign in
  const handleSignIn = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);
    const identifier = e.target.querySelector('#signin-identifier').value.trim();
    const password = e.target.querySelector('#signin-password').value;

    let loginEmail = identifier;

    // If identifier looks like a username (no @), try to resolve it to an email
    if (!identifier.includes('@')) {
      // First try the profiles table
      let resolved = false;
      try {
        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', identifier)
          .single();
        if (!profileErr && profile?.email) {
          loginEmail = profile.email;
          resolved = true;
        }
      } catch (_) {
        // profiles table unavailable
      }

      if (!resolved) {
        setAuthError('Username not found. Please sign in with your email address instead.');
        setAuthLoading(false);
        return;
      }
    }

    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
      return;
    }
    setAuthLoading(false);
    setShowSignIn(false);
  };

  //function for log out
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const openSignUp = () => { setAuthError(''); setShowSignIn(false); setShowSignUp(true); setShowPassword(false); setPasswordValue(''); };
  const openSignIn = () => { setAuthError(''); setShowSignUp(false); setShowSignIn(true); setShowPassword(false); };

  //scroll fade effect for card
  const pageRef = useScrollFade({ threshold: 0.1 });

  //framework we use
  const frameworks = [
    { name: "LangChain", color: "#1AA260" },
    { name: "CrewAI", color: "#7C3AED" },
    { name: "AutoGen", color: "#0EA5E9" },
    { name: "OpenAI Swarm", color: "#F59E0B" },
  ];

  //main feature of platform
  const features = [
    {
      title: "Review & Rate Agents",
      desc: "Submit structured reviews on any AI agent. Rate task completion, accuracy, speed, and overall satisfaction.",
    },
    {
      title: "Execution Traces",
      desc: "Attach full execution traces to reviews. See every LLM call, tool use, and decision point under the hood.",
    },
    {
      title: "Observability Dashboard",
      desc: "Track token usage, cost-per-run, latency, and tool-call success rates. All the data developers need.",
    },
    {
      title: "Framework Support",
      desc: "Works with LangChain, CrewAI, AutoGen, OpenAI Swarm, and more. Compare agents across your stack.",
    },
    {
      title: "Community Reviews",
      desc: "Browse reviews from real users before integrating an agent. Build trust through transparent track records.",
    },
  ];

  //how platform working
  const steps = [
    { num: 1, title: "Connect Your Agent" },
    { num: 2, title: "Collect Feedback & Data" },
    { num: 3, title: "Improve & Iterate" },
  ];

  return (
    <div ref={pageRef} className="page-wrapper">
      {/*floating background orbs for depth */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      {/*flowing geometric background lines */}
      <svg className="bg-lines" viewBox="0 0 1440 4000" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/*main flowing curves */}
        <path d="M-50 0 C200 200, 400 100, 500 400 S700 800, 600 1100 S300 1400, 500 1700 S800 2000, 700 2300 S400 2600, 600 2900 S900 3200, 700 3500 S500 3800, 600 4000"
          stroke="url(#lineGrad1)" strokeWidth="1.5" />
        <path d="M1490 100 C1200 300, 1000 200, 900 500 S700 900, 800 1200 S1100 1500, 900 1800 S600 2100, 800 2400 S1100 2700, 900 3000 S700 3300, 800 3600 S1000 3900, 900 4000"
          stroke="url(#lineGrad2)" strokeWidth="1.5" />
        {/*dashed connecting path down the center */}
        <path d="M720 0 C720 300, 400 400, 500 700 S800 1000, 720 1300 S500 1600, 720 1900 S900 2200, 720 2500 S500 2800, 720 3100 S900 3400, 720 3700"
          stroke="url(#lineGrad3)" strokeWidth="1" strokeDasharray="8 12" />
        {/*node circles along the curves */}
        <circle cx="500" cy="400" r="4" fill="var(--accent)" opacity="0.55" />
        <circle cx="600" cy="1100" r="4" fill="var(--accent)" opacity="0.5" />
        <circle cx="500" cy="1700" r="3.5" fill="var(--accent)" opacity="0.55" />
        <circle cx="700" cy="2300" r="4" fill="var(--accent)" opacity="0.5" />
        <circle cx="600" cy="2900" r="3.5" fill="var(--accent)" opacity="0.55" />
        <circle cx="900" cy="500" r="4" fill="var(--accent)" opacity="0.5" />
        <circle cx="800" cy="1200" r="3.5" fill="var(--accent)" opacity="0.55" />
        <circle cx="900" cy="1800" r="4" fill="var(--accent)" opacity="0.5" />
        <circle cx="800" cy="2400" r="3.5" fill="var(--accent)" opacity="0.55" />
        <circle cx="720" cy="700" r="3" fill="var(--accent)" opacity="0.4" />
        <circle cx="720" cy="1300" r="3" fill="var(--accent)" opacity="0.4" />
        <circle cx="720" cy="1900" r="3" fill="var(--accent)" opacity="0.4" />
        <circle cx="720" cy="2500" r="3" fill="var(--accent)" opacity="0.4" />
        {/*connector lines between the two main curves */}
        <line x1="500" y1="400" x2="900" y2="500" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
        <line x1="600" y1="1100" x2="800" y2="1200" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
        <line x1="500" y1="1700" x2="900" y2="1800" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
        <line x1="700" y1="2300" x2="800" y2="2400" stroke="var(--accent)" strokeWidth="0.8" opacity="0.2" />
        {/*diamond shapes along paths */}
        <rect x="494" y="394" width="12" height="12" rx="2" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(45 500 400)" />
        <rect x="794" y="1194" width="12" height="12" rx="2" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(45 800 1200)" />
        <rect x="694" y="2294" width="12" height="12" rx="2" stroke="var(--accent)" strokeWidth="1" fill="none" opacity="0.35" transform="rotate(45 700 2300)" />
        {/*gradient defs */}
        <defs>
          <linearGradient id="lineGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="30%" stopColor="var(--accent)" stopOpacity="0.45" />
            <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="lineGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
            <stop offset="40%" stopColor="var(--accent)" stopOpacity="0.4" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="lineGrad3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/*topbar */}
      <header className="topbar">
        <div className="topbar-box">
          <div className="topbar-left">
            <a href="#" className="topbar-logo">
              <span className="logo-mark">R</span>
              ReviewMyAgent
            </a>
            <nav className="topbar-nav">
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
            </nav>
          </div>
          <div className="topbar-right">
            {user ? (
              <button className="topbar-logout-btn" onClick={handleLogout}>Log Out</button>
            ) : (
              <>
                <button className="topbar-signup-btn" onClick={openSignUp}>Sign Up</button>
                <button className="topbar-signup-btn" onClick={openSignIn}>Sign In</button>
              </>
            )}
            <a href="/builders" className="topbar-btn">Reviewer Dashboard</a>
            <a href="/developer" className="topbar-btn">Developer Dashboard</a>
          </div>
        </div>
      </header>

      {/* sign-up modal overlay */}
      {showSignUp && (
        <div className="signup-overlay" onClick={() => setShowSignUp(false)}>
          <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="signup-close" onClick={() => setShowSignUp(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="signup-header">
              <h2>Create your account</h2>
              <p className="signup-subtitle">Start evaluating AI agents today</p>
            </div>
            {authError && <div className="auth-error">{authError}</div>}
            <form className="signup-form" onSubmit={handleSignUp}>
              <div className="signup-field">
                <label htmlFor="signup-name" className="signup-label mono">Username</label>
                <input id="signup-name" type="text" className="signup-input" placeholder="agent_reviewer42" autoComplete="username" required />
              </div>
              <div className="signup-field">
                <label htmlFor="signup-email" className="signup-label mono">Email</label>
                <input
                  id="signup-email"
                  type="email"
                  className="signup-input"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                  pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+"
                  title="Enter a valid email address (e.g. you@company.com)"
                />
              </div>
              <div className="signup-field">
                <label htmlFor="signup-password" className="signup-label mono">Password</label>
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  className="signup-input"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
                />
                {/* Live password requirements checklist */}
                {passwordValue.length > 0 && (
                  <ul className="password-rules">
                    {PASSWORD_RULES.map((rule) => {
                      const ok = rule.test(passwordValue);
                      return (
                        <li key={rule.display} className={`password-rule ${ok ? 'rule-ok' : 'rule-fail'}`}>
                          <span className="rule-icon">{ok ? '✓' : '✗'}</span>
                          {rule.display}
                        </li>
                      );
                    })}
                  </ul>
                )}
                {/* Static hint when field is empty */}
                {passwordValue.length === 0 && (
                  <p className="password-hint">Min. 8 chars · starts with capital · ends with special (!@#$%…)</p>
                )}
              </div>
              <div className="signup-field">
                <label htmlFor="signup-confirm-password" className="signup-label mono">Confirm Password</label>
                <input id="signup-confirm-password" type={showPassword ? "text" : "password"} className="signup-input" placeholder="••••••••" autoComplete="new-password" required />
              </div>
              <div className="signup-field" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '-10px', marginBottom: '16px' }}>
                <input id="show-signup-password" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} style={{ cursor: 'pointer' }} />
                <label htmlFor="show-signup-password" style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--text-dim)', cursor: 'pointer' }}>Show password</label>
              </div>
              <div className="signup-captcha">
                <div ref={recaptchaRef} id="recaptcha-container" />
              </div>
              <button type="submit" className={`signup-submit${!captchaVerified || authLoading ? ' signup-submit-disabled' : ''}`} disabled={!captchaVerified || authLoading}>
                {authLoading ? 'Creating account...' : 'Create Account'}
              </button>
              <p className="signup-footer-text">Already have an account? <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); openSignIn(); }}>Sign in</a></p>
            </form>
          </div>
        </div>
      )}

      {/* sign-in modal overlay */}
      {showSignIn && (
        <div className="signup-overlay" onClick={() => setShowSignIn(false)}>
          <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="signup-close" onClick={() => setShowSignIn(false)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="signup-header">
              <h2>Welcome back</h2>
              <p className="signup-subtitle">Sign in to your account</p>
            </div>
            {authError && <div className="auth-error">{authError}</div>}
            <form className="signup-form" onSubmit={handleSignIn}>
              <div className="signup-field">
                <label htmlFor="signin-identifier" className="signup-label mono">Email or Username</label>
                <input id="signin-identifier" type="text" className="signup-input" placeholder="Enter email or username" autoComplete="username" required />
              </div>
              <div className="signup-field">
                <label htmlFor="signin-password" className="signup-label mono">Password</label>
                <input id="signin-password" type={showPassword ? "text" : "password"} className="signup-input" placeholder="••••••••" autoComplete="current-password" required />
              </div>
              <div className="signup-field" style={{ flexDirection: 'row', alignItems: 'center', marginTop: '-4px' }}>
                <input id="show-signin-password" type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} style={{ cursor: 'pointer' }} />
                <label htmlFor="show-signin-password" style={{ marginLeft: '8px', fontSize: '13px', color: 'var(--text-dim)', cursor: 'pointer' }}>Show password</label>
              </div>
              <button type="submit" className={`signup-submit${authLoading ? ' signup-submit-disabled' : ''}`} disabled={authLoading}>
                {authLoading ? 'Signing in...' : 'Sign In'}
              </button>
              <p className="signup-footer-text">Don't have an account? <a href="#" className="signup-link" onClick={(e) => { e.preventDefault(); openSignUp(); }}>Sign up</a></p>
            </form>
          </div>
        </div>
      )}

      {/*hero with decorative grid pattern */}
      <section className="hero">
        <div className="hero-grid-pattern" />
        <div className="container">
          <div className="hero-badge mono fade-element">
            <span className="badge-dot" />
            AI Agent Evaluation Platform
          </div>
          <h1>
            Understand how your<br />
            <span className="highlight">AI agents</span> actually perform
          </h1>
          <p className="hero-sub">
            The only platform that connects real user satisfaction scores to
            execution traces, token costs, and tool-call logs. Stop guessing, start measuring.
          </p>
          <div className="hero-actions">
            <a href="#features" className="btn-primary">
              Explore Platform
              <span style={{ fontSize: '12px' }}>↓</span>
            </a>
            <a href="#how-it-works" className="btn-secondary">How It Works</a>
          </div>
        </div>
      </section>

      {/*gradient accent line */}
      <div className="gradient-line" />

      {/*supported frameworks */}
      <div className="frameworks-strip" id="frameworks">
        <div className="container">
          <div className="strip-label mono">Works with your stack</div>
          <div className="fw-row">
            {frameworks.map(({ name, color }) => (
              <div className="fw-chip" key={name}>
                <div className="fw-dot" style={{ background: color }} />{name}
              </div>
            ))}
            <div className="fw-chip" style={{ opacity: 0.4 }}>
              <div className="fw-dot" style={{ background: 'var(--text-dim)' }} />
              + more soon
            </div>
          </div>
        </div>
      </div>

      <div className="gradient-line" />

      {/*platform features */}
      <section className="section features-section" id="features">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 0' }}>
            <div className="section-label mono">Platform Features</div>
            <div className="section-heading">
              Everything you need to evaluate,<br />monitor, and improve AI agents
            </div>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              From structured user reviews to deep execution traces,
              ReviewMyAgent bridges human experience and machine performance.
            </p>
          </div>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className={`feature-card fade-element fade-delay-${i + 1}`} key={f.title}>
                <div className="feature-card-glow" />
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gradient-line" />

      {/*how it works */}
      <section className="section" id="how-it-works">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <div className="section-label mono">How It Works</div>
            <div className="section-heading">Three steps to better agents</div>
          </div>

          {/*steps with connecting line */}
          <div className="steps-wrapper">
            <div className="steps-connector" />
            <div className="steps-row">
              {steps.map((s, i) => (
                <div className={`step-card fade-element fade-delay-${i + 1}`} key={s.num}>
                  <div className="step-num mono">{s.num}</div>
                  <h3>{s.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-line" />

      {/*who is this for - users vs developers */}
      <section className="section audience-section" id="who-its-for">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '560px', margin: '0 auto 56px' }}>
            <div className="section-label mono">Who It's For</div>
            <div className="section-heading">Built for both sides<br />of the AI equation</div>
            <p className="section-desc" style={{ margin: '0 auto' }}>
              Whether you're evaluating agents as an end user or building and shipping them as a developer,
              ReviewMyAgent has a dedicated workspace for you.
            </p>
          </div>

          <div className="audience-grid">
            {/*users card */}
            <div className="audience-card fade-element fade-delay-1">
              <div className="audience-card-glow audience-glow-user" />
              <div className="audience-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <div className="audience-tag mono">For Users</div>
              <h3>Review agents you've used</h3>
              <p>Share structured feedback on any AI agent you've interacted with. Rate accuracy, helpfulness, and task completion. Your experience helps developers build better tools.</p>
              <ul className="audience-list">
                <li>Submit ratings and written reviews</li>
                <li>See how others rate the same agents</li>
                <li>Track your review history</li>
              </ul>
              <a href="/builders" className="audience-btn audience-btn-user">Go to Reviewer Dashboard →</a>
            </div>

            {/*developers card */}
            <div className="audience-card fade-element fade-delay-2">
              <div className="audience-card-glow audience-glow-dev" />
              <div className="audience-icon audience-icon-dev">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <div className="audience-tag audience-tag-dev mono">For Developers</div>
              <h3>Monitor your agents in production</h3>
              <p>Get a complete view of how your agents are performing, from user satisfaction scores to token costs, latency, tool call success rates, and full execution traces.</p>
              <ul className="audience-list">
                <li>View satisfaction scores alongside traces</li>
                <li>Track cost, latency, and error rates</li>
                <li>Compare agent versions over time</li>
              </ul>
              <a href="/developer" className="audience-btn audience-btn-dev">Go to Developer Dashboard →</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

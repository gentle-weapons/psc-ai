import styles from '@/components/Forms.module.css'

export function SignUpForm({ signupEmail, setSignupEmail, roleOptions, selectedRole, setSelectedRole, handleSignupSubmit }) {
    return (
        <>
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
                        <button type="button" key={value} className={`role-chip ${selectedRole === value ? `sel-${value}` : ''}`} onClick={() => setSelectedRole(value)}>
                        {label}
                        </button>
                    ))}
                    </div>
                </div>
                <button type="submit" className="loop-btn">Notify me</button>
                <div className="loop-note">No account needed. Unsubscribe any time.</div>
            </form>
        </>
    )
}

export function SuccessMessage({ signupEmail }) {
  return (
    <div className={styles.successMessage}>
      <div className={styles.successIcon}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="rgba(34, 197, 94, 0.1)" />
          <path d="M8.5 14.5l4 4 7-8" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className={styles.successTitle}>You're on the list</h3>

      <p className={styles.successBody}>
        We'll reach out to{" "}
        <span className={styles.successEmail}>{signupEmail}</span> as we hit
        meaningful milestones.
      </p>
    </div>
  );
}

export function ErrorMessage({ onRetry }) {
  return (
    <div className={styles.errorMessage}>
      <div className={styles.errorIcon}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="14" cy="14" r="14" fill="rgba(239, 68, 68, 0.1)" />
          <path d="M9.5 9.5l9 9M18.5 9.5l-9 9" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h3 className={styles.errorTitle}>Something went wrong</h3>

      <p className={styles.errorBody}>We couldn't save your email this time. It's on our end, not yours. Please try again in a moment.</p>

      <button className={styles.errorRetryBtn} type="button" onClick={onRetry}>
        Try again
      </button>
    </div>
  );
}
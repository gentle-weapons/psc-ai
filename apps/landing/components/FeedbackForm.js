/* Component for feedback/submission form */

import { useState } from "react";
import { supabase } from '../app/lib/supabaseClient';
import ArrowIcon from "./ArrowIcon";

const categories = ["Pain point", "Feature idea", "Use case", "Other"];

export default function FeedbackForm({ signupEmail }) {
  const [selectedCategory, setSelectedCategory] = useState("Pain point");
  const [feedback, setFeedback] = useState("");
  const [feedbackEmail, setFeedbackEmail] = useState("");
  const [status, setStatus] = useState(null); 

  async function handleSubmit() {
    if (!feedback.trim()) return;

    const { error } = await supabase
      .schema("landing")
      .from("feedback")
      .insert([{
        category: selectedCategory,
        content: feedback,
        email: feedbackEmail || null,
        created_at: new Date().toISOString(),
      }]);

    if (error) {
      console.error("Error submitting feedback:", error.message);
      setStatus("error");
    } else {
      setStatus("success");
      setFeedback("");
      setFeedbackEmail("");
    }
  }

  return (
    <div className="suggest-panel">
      <div className="loop-panel-tag">💡 Share Feedback</div>
      <h3>Tell us what you need</h3>
      <p>
        Using AI agents today and running into problems? Share any pain
        points and feature ideas you would like to see or things we can improve!

      </p>

      <div className="suggest-form">
        <div>
          <div className="chip-label">Category</div>
          <div className="suggest-category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`cat-chip ${selectedCategory === cat ? "sel" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
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
          className="suggest-input"
          type="email"
          placeholder="Email (optional — only if you'd like a reply)"
          value={feedbackEmail}
          onChange={(e) => setFeedbackEmail(e.target.value)}
        />

        {status === "success" && (
          <p style={{ color: "var(--green)", fontSize: 13, margin: 0 }}>
            ✓ Thanks! We got your feedback.
          </p>
        )}
        {status === "error" && (
          <p style={{ color: "var(--amber)", fontSize: 13, margin: 0 }}>
            Something went wrong — please try again.
          </p>
        )}

        <button className="suggest-btn" onClick={handleSubmit} disabled={!feedback.trim()}>
          Submit feedback <ArrowIcon />
        </button>
      </div>
    </div>
  );
}
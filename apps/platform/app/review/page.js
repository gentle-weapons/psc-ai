"use client";

import { ScaleInput, RadioInput, TextareaInput, DropdownInput } from "./components"
import { useState } from "react";

const questions = [
  {
    id: "task_description",
    section: "Overview",
    label: "Describe the agent task",
    type: "textarea",
    placeholder: "What was the goal of this task? What did you ask the agent to do?",
  },
  {
    id: "framework",
    section: "Setup",
    label: "Which agent framework was used?",
    type: "dropdown",
    options: ["LangChain", "LangGraph", "CrewAI", "AutoGen"],
  },
  {
    id: "completion",
    section: "Outcome",
    label: "Did the agent complete the task you asked for?",
    type: "radio",
    options: ["Yes", "Partially", "No"],
  },
  {
    id: "accuracy",
    section: "Outcome",
    label: "How accurate or correct was the output?",
    type: "scale",
    min: 1,
    max: 5,
    pointLabels: ["Wrong", "Mostly", "Okay", "Close", "Exact"],
  },
  {
    id: "extra_actions",
    section: "Outcome",
    label: "Did the agent do anything you didn't ask for?",
    type: "radio",
    options: ["No", "Yes, helpfully", "Yes, unhelpfully"],
  },
  {
    id: "process_sense",
    section: "Process",
    label: "Did the agent's steps make sense to you?",
    type: "radio",
    options: ["Yes", "Mostly", "No"],
  },
  {
    id: "tool_use",
    section: "Process",
    label: "Did it use the right tools for the job?",
    type: "radio",
    options: ["Yes", "Mostly", "No", "Unsure"],
  },
  {
    id: "trust",
    section: "Trust",
    label: "How confident did you feel about what the agent was doing at each step?",
    type: "scale",
    min: 1,
    max: 5,
    pointLabels: ["None", "Little", "Some", "Mostly", "Full"],
  },
  {
    id: "clarification",
    section: "Trust",
    label: "Did the agent ask for clarification when it should have?",
    type: "radio",
    options: ["Yes, appropriately", "It asked too much", "It should've asked more", "N/A"],
  },
  {
    id: "satisfaction",
    section: "Result",
    label: "Overall, how satisfied are you with the result?",
    type: "scale",
    min: 1,
    max: 5,
    pointLabels: ["Poor", "Fair", "Okay", "Good", "Great"],
  },
];

const sectionColors = {
  Overview: { label: "text-zinc-400" },
  Outcome: { label: "text-amber-400" },
  Process: { label: "text-sky-400" },
  Trust:   { label: "text-violet-400" },
  Result:  { label: "text-emerald-400" },
  Setup:   { label: "text-orange-400" },
};

export default function AgentReviewForm() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sections = [...new Set(questions.map((q) => q.section))];
  const answered = Object.keys(answers).filter((k) => answers[k] !== "" && answers[k] !== undefined).length;
  const progress = Math.round((answered / questions.length) * 100);

  const handleSubmit = () => {
    if (answered === questions.length) {
        setSubmitted(true);
        // Insert each answer into the database's "review" table
        // Navigate to the reviews "detailed" view (that others can see)
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <div className="border-b border-zinc-800/80 sticky top-0 bg-zinc-950/90 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold tracking-tight">Agent Review</h1>
            <p className="text-xs text-zinc-500 font-mono mt-0.5">{answered}/{questions.length} answered</p>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <div className="w-28 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, backgroundColor: "#8B5CF6" }} />
            </div>
            <span className="text-xs text-zinc-500 font-mono w-8 text-right">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Intro */}
        <div className="mb-10">
          <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">Answer each question to help evaluate the quality of the agent's work.</p>
        </div>

        {/* Questions grouped by section */}
        <div className="space-y-12">
          {sections.map((section) => {
            const sectionQs = questions.filter((q) => q.section === section);
            const col = sectionColors[section];
            return (
              <div key={section} id={`section-${section}`}>
                <div className="flex items-center gap-2 mb-6">
                  <span className={`text-xs uppercase tracking-widest ${col.label}`}>{section}</span>
                </div>
                <div className="space-y-7">
                  {sectionQs.map((q, index) => (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border transition-all duration-200 ${
                        answers[q.id] !== undefined
                          ? "border-zinc-700 bg-zinc-900/50"
                          : "border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700"
                      } ${q.type === "dropdown" ? "flex items-center" : ""}`}
                    >
                      <label className="text-sm text-zinc-200 font-medium leading-snug">
                        {q.label}
                        {answers[q.id] !== undefined && answers[q.id] !== "" && (
                          <span className="ml-2 text-xs" style={{ color: "#8B5CF6" }}>✓</span>
                        )}
                      </label>
                      {q.type === "scale" && (
                        <ScaleInput
                          question={q}
                          value={answers[q.id]}
                          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        />
                      )}
                      {q.type === "radio" && (
                        <RadioInput
                          question={q}
                          value={answers[q.id]}
                          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        />
                      )}
                      {q.type === "dropdown" && (
                        <DropdownInput
                          question={q}
                          value={answers[q.id]}
                          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        />
                      )}
                      {q.type === "textarea" && (
                        <TextareaInput
                          question={q}
                          value={answers[q.id] || ""}
                          onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit */}
        <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between">
          <p className="text-xs text-zinc-600">
            {questions.length - answered} question{questions.length - answered !== 1 ? "s" : ""} remaining
          </p>
          <button
            onClick={handleSubmit}
            disabled={answered < questions.length}
            className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200
              ${answered === questions.length
                ? "text-white hover:opacity-90 shadow-lg hover:scale-[1.02] cursor-pointer"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700"
              }`}
            style={answered === questions.length ? { backgroundColor: "#8B5CF6", boxShadow: "0 4px 24px #8B5CF640" } : {}}
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
}
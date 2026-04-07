"use client";

import { use, useState } from "react";
import Link from 'next/link';

import { ScoreBar, MetricTile, ScoreBadge } from "../components";
import { allReviews } from "../mockData";

// Returns reviews sorted by date desc, grouped so same-agent reviews are adjacent
function groupedReviews(reviews) {
  // Preserve agent grouping order by first appearance, sort within each group by date desc
  const order = [];
  const groups = {};
  reviews.forEach((r) => {
    if (!groups[r.agentName]) {
      groups[r.agentName] = [];
      order.push(r.agentName);
    }
    groups[r.agentName].push(r);
  });
  // Sort each group by date descending (already sorted in data, but enforce it)
  order.forEach((name) => groups[name].sort((a, b) => new Date(b.date) - new Date(a.date)));
  return order.flatMap((name) => groups[name]);
}

export default function ReviewPlatform({ params }) {
  const [selected, setSelected] = useState(allReviews[0]);
  const [tab, setTab] = useState("experience");
  const [search, setSearch] = useState("");

  const { username } = use(params);
  const builder = developers.find((d) => d.username === username);
  const builderReviews = allReviews.filter(r => r.builderUsername === builder.username);

  const filtered = (() => {
    const base = builderReviews.filter((r) =>
      r.agentName.toLowerCase().includes(search.toLowerCase())
    );
    return groupedReviews(base);
  })();

  const experienceFields = [
    { key: "goalCompletion", label: "Goal Completion" },
    { key: "helpfulness", label: "Helpfulness" },
    { key: "coherence", label: "Coherence" },
    { key: "factuality", label: "Factuality" },
    { key: "safety", label: "Safety" },
  ];

  // Determine when to show the agent name label (first review of each agent group)
  function showAgentLabel(reviews, index) {
    if (index === 0) return true;
    return reviews[index].agentName !== reviews[index - 1].agentName;
  }

  return (
    <div className="h-screen bg-stone-950 text-stone-200 font-sans flex flex-col">
      {/* Header (this will be replaced with a uniform navigation bar across the entire app once built) */}
      <header className="border-b border-stone-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium tracking-wide text-stone-300">ReviewMyAgent</span>
        </div>
        <Link href="/review" className="text-white bg-[#8B5CF6] px-4 py-2 rounded-lg">Create Review</Link>
      </header>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 57px)" }}>
        {/* Sidebar */}
        <aside className="w-72 border-r border-stone-800 flex flex-col overflow-hidden flex-shrink-0">

          {/* Builder profile */}
          <div className="px-4 pt-4 pb-3 border-b border-stone-800">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-lg bg-violet-500/20 border border-violet-500/30 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-violet-300">{builder.name[0]}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-stone-200">{builder.name}</p>
                <p className="text-xs text-stone-600 font-mono">@{builder.username}</p>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-2">{builder.bio}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-600">{builder.agentCount} Agents</span>
              <span className="text-xs text-stone-700">·</span>
              <span className="text-xs text-stone-600">Since {builder.joinedDate}</span>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 pt-3 pb-2 border-b border-stone-800">
            <div className="relative">
              <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search agents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-stone-900 border border-stone-700/50 rounded-md pl-8 pr-7 py-1.5 text-xs text-stone-300 placeholder-stone-600 focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20 transition-colors"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-600 hover:text-stone-400 transition-colors">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <div className="px-4 py-2 border-b border-stone-800 flex items-center justify-between">
            <p className="text-xs font-medium text-stone-500 uppercase tracking-widest">Reviews</p>
            <span className="text-xs font-mono text-stone-600">{filtered.length} / {allReviews.length}</span>
          </div>

          {/* Review list */}
          <div className="overflow-y-auto flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2 px-4 text-center">
                <svg className="w-6 h-6 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                </svg>
                <p className="text-xs text-stone-600">No reviews match your filters</p>
                <button onClick={() => setSearch("")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Clear filters
                </button>
              </div>
            ) : (
              filtered.map((r, i) => (
                <div key={r.id}>
                  {/* Agent group label — only shown on first review of each agent */}
                  {showAgentLabel(filtered, i) && (
                    <div className={`px-4 py-1.5 flex items-center gap-2 ${i !== 0 ? "border-t border-stone-800 mt-1 pt-2.5" : ""}`}>
                      <span className="text-xs font-medium text-stone-400">{r.agentName}</span>
                      <span className="text-xs font-mono text-stone-700">{r.framework}</span>
                    </div>
                  )}
                  <button
                    onClick={() => { setSelected(r); setTab("experience"); }}
                    className={`w-full text-left px-4 py-3 border-b border-stone-800/40 transition-colors hover:bg-stone-900 ${
                      selected.id === r.id
                        ? "bg-stone-900 border-l-2 border-l-violet-500"
                        : "border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-sm text-stone-300 truncate block">{r.reviewer}</span>
                        <span className="text-xs font-mono text-stone-600">{r.date}</span>
                      </div>
                      <ScoreBadge score={r.overallScore} />
                    </div>
                  </button>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* Detail panel */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="px-6 py-4 border-b border-stone-800 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-lg font-semibold text-stone-100 mb-0.5">{selected.agentName}</h1>
              <p className="text-xs text-stone-500 mb-2">Review by {selected.reviewer} · {selected.date}</p>
              <span className="text-xs text-stone-600 font-mono">{selected.framework}</span>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="text-2xl font-mono font-semibold text-stone-100">{selected.overallScore.toFixed(1)}</div>
              <div className="text-xs text-stone-600">overall</div>
            </div>
          </div>

          {/* Tab toggle */}
          <div className="px-6 pt-4 pb-0 border-b border-stone-800">
            <div className="flex w-fit bg-stone-900 border border-stone-700/50 rounded-lg p-0.5">
              {["experience", "metrics"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                    tab === t ? "bg-stone-700 text-stone-100 shadow-sm" : "text-stone-500 hover:text-stone-300"
                  }`}
                >
                  {t === "experience" ? "Experience" : "Metrics"}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {tab === "experience" ? (
              <div className="grid grid-cols-2 gap-6 h-full">
                {/* Left column — rubric scores */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Rubric scores</p>
                    <div className="space-y-3">
                      {experienceFields.map(({ key, label }) => (
                        <div key={key} className="grid grid-cols-[120px_1fr] items-center gap-3">
                          <span className="text-sm text-stone-400">{label}</span>
                          <ScoreBar value={selected.experience[key]} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column — agent task + reviewer note */}
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Agent task</p>
                    <div className="bg-stone-900 border border-stone-700/50 rounded-lg px-4 py-3">
                      <p className="text-sm text-stone-300 leading-relaxed">{selected.agentTask}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Reviewer note</p>
                    <div className="bg-stone-900 border border-stone-700/50 rounded-lg px-4 py-3">
                      <p className="text-sm text-stone-300 leading-relaxed">{selected.experience.freeText}</p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-stone-800">
                        <div className="w-5 h-5 rounded-full bg-stone-700 flex items-center justify-center">
                          <span className="text-xs text-stone-400">{selected.reviewer[0]}</span>
                        </div>
                        <span className="text-xs text-stone-500">{selected.reviewer}</span>
                        <span className="text-xs text-stone-700 ml-auto font-mono">{selected.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6 max-w-xl">
                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Performance</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                    <MetricTile label="Latency" value={`${(selected.metrics.latencyMs / 1000).toFixed(2)}s`} highlight={selected.metrics.latencyMs > 5000} />
                    <MetricTile label="Cost" value={`$${selected.metrics.costUsd.toFixed(3)}`} />
                    <MetricTile label="Path efficiency" value={`${Math.round(selected.metrics.pathEfficiency * 100)}%`} highlight={selected.metrics.pathEfficiency < 0.7} />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Trace breakdown</p>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    <MetricTile label="LLM calls" value={selected.metrics.llmCalls} />
                    <MetricTile label="Tool calls" value={selected.metrics.toolCalls} />
                    <MetricTile label="Errors" value={selected.metrics.errors} highlight={selected.metrics.errors > 0} />
                    <MetricTile label="Context tokens" value={selected.metrics.contextTokens.toLocaleString()} sub="input" />
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium text-stone-500 uppercase tracking-widest mb-3">Token usage</p>
                  <div className="bg-stone-900 border border-stone-700/50 rounded-lg px-4 py-3 space-y-2">
                    {[
                      { label: "Context (input)", value: selected.metrics.contextTokens, color: "bg-violet-500" },
                      { label: "Completion (output)", value: selected.metrics.completionTokens, color: "bg-teal-500" },
                    ].map(({ label, value, color }) => {
                      const total = selected.metrics.contextTokens + selected.metrics.completionTokens;
                      return (
                        <div key={label}>
                          <div className="flex justify-between text-xs text-stone-500 mb-1">
                            <span>{label}</span>
                            <span className="font-mono">{value.toLocaleString()}</span>
                          </div>
                          <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width: `${(value / total) * 100}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-stone-700 font-mono border border-stone-800 rounded px-3 py-2 bg-stone-900/50">
                  <span className="text-stone-600">trace_id</span>
                  <span>·</span>
                  <span>rev_{selected.id.toString().padStart(4, "0")}_{selected.date.replace(/\s/g, "").toLowerCase()}</span>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
// A component used to display metrics of a selected agent.
//
// 'agent' - the agent object to display details for
// 'COLORS' - the color palette object

'use client';

import React from 'react';

export default function AgentDetail({ agent, COLORS}) {
  if (!agent) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        height: '100%', fontFamily: 'monospace', color: COLORS.textDim,
        fontSize: 13, letterSpacing: 0.5,
      }}>
        SELECT AN AGENT TO INSPECT
      </div>
    );
  }

  return (
    <div style={{ padding: '0 4px' }}>
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: 20,
        paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}`,
      }}>
        <div>
          <div style={{
            fontFamily: 'monospace', fontSize: 10, color: COLORS.textMuted,
            letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4,
          }}>
            Agent Inspector · {agent.id}
          </div>
          <h2 style={{
            margin: 0, fontFamily: "'DM Mono', 'Fira Mono', monospace",
            fontSize: 22, fontWeight: 700, color: COLORS.text, letterSpacing: -0.5,
          }}>
            {agent.name}
          </h2>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <StatusPill status={agent.status} COLORS={COLORS} />
            <FrameworkTag framework={agent.framework} COLORS={COLORS} />
            {agent.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, fontFamily: 'monospace', color: COLORS.textMuted,
                padding: '2px 6px', border: `1px solid ${COLORS.border}`, borderRadius: 3,
              }}>
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{
            fontFamily: 'monospace', fontSize: 10,
            color: COLORS.textMuted, letterSpacing: 0.5, marginBottom: 4,
          }}>
            COMPOSITE SCORE
          </div>
          <ScoreBadge score={agent.score} large COLORS={COLORS} />
          <div style={{
            fontFamily: 'monospace', fontSize: 11,
            color: agent.trend >= 0 ? COLORS.green : COLORS.red, marginTop: 4,
          }}>
          </div>
        </div>
      </div>

      {/* Runtime Metrics */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: 'monospace', fontSize: 10, color: COLORS.textMuted,
          letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10,
        }}>
          Runtime Metrics
        </div>
        <div style={{
          background: COLORS.surfaceHigh, borderRadius: 6,
          padding: '14px 16px', border: `1px solid ${COLORS.border}`,
        }}>
          <MetricBar label="Goal Completion" value={agent.metrics.goalCompletion} COLORS={COLORS} />
          <MetricBar label="Path Efficiency" value={agent.metrics.pathEfficiency} COLORS={COLORS} />
          <MetricBar label="Latency" value={agent.metrics.latencyMs} max={10000} unit=" ms" COLORS={COLORS} invert/>
          <MetricBar label="Cost / Run" value={Math.round(agent.metrics.costPerRun * 100)} max={100} unit="¢" COLORS={COLORS} invert/>
        </div>
      </div>
    </div>
  );
}
// Function to display status of agent
function StatusPill({ status, COLORS }) {
  const color = status === 'active' ? COLORS.green : COLORS.red;
  return (
    <span style={{
      fontSize: 10, fontFamily: 'monospace', color,
      padding: '2px 8px', border: `1px solid ${color}`,
      borderRadius: 3, textTransform: 'uppercase', letterSpacing: 1,
    }}>
      {status}
    </span>
  );
}
// Function to display framework tag (must add color for framework used)
function FrameworkTag({ framework, COLORS }) {
  return (
    <span style={{
      fontSize: 10, fontFamily: 'monospace', color: COLORS.purple,
      padding: '2px 8px', border: `1px solid ${COLORS.purple}`,
      borderRadius: 3,
    }}>
      {framework}
    </span>
  );
}
// Function to calculate color of composite score
function ScoreBadge({ score, large, COLORS }) {
  const color = score >= 80 ? COLORS.green : score >= 60 ? COLORS.amber : COLORS.red;
  return (
    <span style={{
      fontFamily: 'monospace', fontWeight: 700,
      fontSize: large ? 28 : 13, color,
    }}>
      {score}
    </span>
  );
}
// Function to calculate color of metrics
function MetricBar({ label, value, max = 100, unit = '%', COLORS, invert = false }) {
  const pct = Math.min((value / max) * 100, 100);
  let color;
  // Invert color if lower is better
  if (invert) {
    color = pct <= 20 ? COLORS.green : pct <= 50 ? COLORS.amber : COLORS.red;
  } else {
    color = pct >= 80 ? COLORS.green : pct >= 50 ? COLORS.amber : COLORS.red;
  }
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: COLORS.textMuted }}>{label}</span>
        <span style={{ fontFamily: 'monospace', fontSize: 11, color: COLORS.text }}>
          {value}{unit}
        </span>
      </div>
      <div style={{ background: COLORS.border, borderRadius: 3, height: 4 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 3 }} />
      </div>
    </div>
  );
}


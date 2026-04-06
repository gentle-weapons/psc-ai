// A component to display a row of key performance stats for agents.
//
// `activeCount` - the total number of active agents, as a number
// `firedCount` - the total number of fired agents, as a number
// `avgScore` - the average performance score of agents, as a number
// `totalReviews` - the total number of reviews conducted, as a number
// `COLORS` - the color palette object

export default function StatsRow({ activeCount, firedCount, avgScore, totalReviews, COLORS }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        marginBottom: 24,
        flexWrap: "wrap",
      }}
    >
      <StatChip
        label="Active Agents"
        value={activeCount}
        sub={`total`}
        color={COLORS.green}
        COLORS={COLORS}
      />

      <StatChip
        label="Agents Fired"
        value={firedCount}
        sub="total"
        color={COLORS.amber}
        COLORS={COLORS}
      />

      <StatChip
        label="Avg Score"
        value={avgScore}
        sub="composite"
        color={avgScore >= 80 ? COLORS.green : COLORS.amber}
        COLORS={COLORS}
      />

      <StatChip
        label="Total Reviews"
        value={totalReviews}
        sub="all time"
        COLORS={COLORS}
      />

    </div>
  );
}

// Chip syles
function StatChip({ label, value, sub, color, COLORS }) {
  return (
    <div
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 6,
        padding: "12px 16px",
        minWidth: 120,
        flex: 1,
      }}
    >
      <div
        style={{
          fontFamily: "monospace",
          fontSize: 9,
          color: COLORS.textMuted,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: "'DM Mono', 'Fira Mono', monospace",
          fontSize: 22,
          fontWeight: 700,
          color: color || COLORS.text, 
          letterSpacing: -0.5,
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {sub && (
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: COLORS.textMuted,
            marginTop: 4,
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}
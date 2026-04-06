import AgentCard from './AgentCard';

export default function AgentList({
  filtered,
  selectedId,
  setSelectedId,
  handleFire,
  COLORS,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {filtered.map((a) => (
        <AgentCard
          key={a.id}
          agent={a}
          selected={selectedId === a.id}
          onClick={() => setSelectedId(a.id)}
          onFire={handleFire}
        />
      ))}

      {filtered.length === 0 && (
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 12,
            color: COLORS.textMuted,
            textAlign: "center",
            padding: 30,
          }}
        >
          No agents match filters
        </div>
      )}
    </div>
  );
}
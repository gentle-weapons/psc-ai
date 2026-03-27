// A component to display a card for an agent in the agent list.
//
// 'agent' - the agent object to display
// 'selected' - boolean indicating if this agent is currently selected
// 'onClick' - function to call when the card is clicked

export default function AgentCard({ agent, selected, onClick}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: 12,
        border: `1px solid ${selected ? '#1f3d2b' : '#2a2a2a'}`,
        borderRadius: 6,
        cursor: "pointer",
        background: selected ? '#1f3d2b' : '#1a1a1a',
      }}
    >
      <div style={{ fontWeight: 600 }}>{agent.name}</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>
        Status: {agent.status}
      </div>
    </div>
  );
}
export function timeAgo(dateStr) {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function statusConfig(status) {
  const map = {
    active: { label: "Active", dot: "var(--green)",   text: "var(--green)",   bg: "var(--greenDim)" },
    fired:  { label: "Fired",  dot: "var(--red)",     text: "var(--red)",     bg: "var(--redDim)"   },
    draft:  { label: "Draft",  dot: "var(--text-dim)", text: "var(--text-muted)", bg: "var(--surface2)" },
  };
  return map[status] || map.draft;
}
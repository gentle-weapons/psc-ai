// A component used to display a filter / search textbox for agents.
//
// 'search' - the current search query, as a string
// 'setSearch' - a function to update the search query
// 'filterStatus' - the current status filter, as a string 
// 'setFilterStatus' - a function to update the status filter
// 'status' - an array of possible status values to filter by 
// 'COLORS' - the color palette object

export default function SearchFilters({ search, setSearch, filterStatus, setFilterStatus, status, COLORS}) {
  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Search agents or tags…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            padding: "8px 12px",
            fontFamily: "monospace",
            fontSize: 12,
            color: COLORS.text,
            marginBottom: 8,
            outline: "none",
          }}
        />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <div
            style={{
              width: 1,
              background: COLORS.border,
              margin: "0 2px",
            }}
          />

          {status.map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              style={{
                fontSize: 10,
                fontFamily: "monospace",
                padding: "3px 8px",
                borderRadius: 3,
                border: `1px solid ${
                  filterStatus === s ? COLORS.amber : COLORS.border
                }`,
                background:
                  filterStatus === s
                    ? COLORS.amberMuted
                    : COLORS.surface,
                color:
                  filterStatus === s
                    ? COLORS.amber
                    : COLORS.textMuted,
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
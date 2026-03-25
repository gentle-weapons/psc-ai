export function ScaleInput({ question, value, onChange }) {
  const points = Array.from({ length: question.max - question.min + 1 }, (_, i) => i + question.min);

  return (
    <div className="mt-3 flex gap-5">
      {points.map((n, i) => (
        <div key={n} className="flex flex-col items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChange(n)}
            className={`w-10 h-10 rounded-full text-sm font-bold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 cursor-pointer
              ${value === n
                ? "bg-white text-zinc-900 border-white scale-110 shadow-lg shadow-white/20"
                : "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-400 hover:text-zinc-200"
              }`}
          >
            {n}
          </button>
          {question.pointLabels && (
            <span className={`text-xs font-mono transition-colors duration-200 ${value === n ? "text-zinc-300" : "text-zinc-600"}`}>
              {question.pointLabels[i]}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export function RadioInput({ question, value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {question.options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 cursor-pointer
            ${value === opt
              ? "bg-white text-zinc-900 border-white font-semibold shadow-md shadow-white/10"
              : "bg-zinc-800/60 text-zinc-300 border-zinc-700 hover:border-zinc-400 hover:text-white"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function DropdownInput({ question, value, onChange }) {
  return (
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="ml-4 bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-500 transition-all appearance-none cursor-pointer pr-8"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2371717a' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
    >
      <option value="" disabled className="bg-zinc-900">Select a framework…</option>
      {question.options.map((opt) => (
        <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
      ))}
    </select>
  );
}

export function TextareaInput({ question, value, onChange }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={question.placeholder}
      rows={4}
      className="mt-3 w-full bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-200 text-sm placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-zinc-500 transition-all resize-none font-light leading-relaxed"
    />
  );
}
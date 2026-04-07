import Link from "next/link";
export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-2xl tracking-widest uppercase font-light">
        PSC AI: Home Page
      </p>
      <Link href="/developer" className="px-4 py-2 bg-slate-700 text-white rounded btn">
        Go to Developer Page
      </Link>
      <Link href="/consumer" className="px-4 py-2 bg-slate-700 text-white rounded btn">
        Go to Consumer Page
      </Link>
    </div>
  );
}

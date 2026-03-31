import Link from "next/link";
export default function Consumer() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-2xl tracking-widest uppercase font-light">
        PSC AI: Consumer Focused Page
      </p>
      <Link href=".." className="px-4 py-2 bg-slate-700 text-white rounded btn">
        Go to Home Page
      </Link>
    </div>
  );
}

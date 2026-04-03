import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-10 py-4 flex items-center justify-between">

        <span className="text-white text-m font-medium">ReviewMyAgent</span>

        <nav className="flex items-center gap-2 !border-b-0">
            <Link href="/privacy" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200 px-2 py-1">Privacy Policy</Link>
            <div className="w-px h-3.5 bg-white/15" />
            <Link href="/terms" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200 px-2 py-1">Terms of Service</Link>
            <div className="w-px h-3.5 bg-white/15" />
            <span className="text-sm text-neutral-600 px-2">© 2026 Gentle Systems</span>
        </nav>

      </div>
    </footer>
  );
}
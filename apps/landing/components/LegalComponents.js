import styles from "@/components/NavigationBar.module.css"
import Link from 'next/link';

export function NavigationBar() {
    return (
        <nav>
            <div className="container">
                <div className={styles.navInner}>
                    <Link href="/" className={styles.logo}>ReviewMyAgent</Link>
                    <div className={styles.navLinks}>
                        <Link href="/privacy" className={styles.navLink}>Privacy Policy</Link>
                        <Link href="/terms" className={styles.navLink}>Terms of Service</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export function BulletList({ items }) {
  return (
    <ul className="my-2 mb-4">
      {items.map((item, i) => (
        <li
          key={i}
          className="relative text-[14.5px] text-[#b0b8c8] font-light leading-relaxed pl-5 py-1.5"
        >
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-violet-500 opacity-60" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ContactCard() {
  return (
    <div className="bg-[#161616] border border-[#1f1f1f] rounded-xl p-6 mt-2 space-y-1.5">
      <p className="text-[14px] font-medium text-[#e8eaed]">Gentle Systems</p>
      <p className="text-[14px] font-light text-[#7a8394]">
        Email:{" "}
        <a href="mailto:contact@reviewmyagent.today" className="text-violet-400 hover:underline">contact@reviewmyagent.today</a>
      </p>
      <p className="text-[14px] font-light text-[#7a8394]">
        Website:{" "}
        <a href="http://reviewmyagent.today" className="text-violet-400 hover:underline">reviewmyagent.today</a>
      </p>
    </div>
  );
}

export function DocSection({ id, title, children }) {
  return (
    <section id={id} className="mb-12 scroll-mt-20">
      <h2 className="text-[22px] font-normal text-[#e8eaed] mb-4 flex items-center gap-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function BodyText({ children }) {
  return (
    <p className="text-[14.5px] text-[#b0b8c8] font-light leading-relaxed mb-3">
      {children}
    </p>
  );
}

export function Callout({ children }) {
  return (
    <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg px-5 py-4 my-3">
      <p className="text-[13px] text-yellow-200/70 font-normal leading-relaxed tracking-wide m-0">
        {children}
      </p>
    </div>
  );
}
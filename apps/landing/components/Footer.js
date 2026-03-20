// Footer Component

import Link from 'next/link';
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer>
            <div className="container">
                <div className={styles.footerInner}>
                    <Link href="#" className={styles.logo}>ReviewMyAgent</Link>
                    <div className={styles.footerCopy}>© 2026 Gentle Systems</div>
                </div>
            </div>
        </footer>
    )
}
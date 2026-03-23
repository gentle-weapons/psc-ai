// NavigationBar Component

import Link from 'next/link';
import styles from './NavigationBar.module.css';

export default function NavigationBar() {
    return (
        <nav>
            <div className="container">
                <div className={styles.navInner}>
                    <Link href="#" className={styles.logo}>ReviewMyAgent</Link>
                    <div className={styles.navLinks}>
                        <a href="#features" className={styles.navLink}>Features</a>
                        <a href="#connect" className={styles.btnNav}>Stay Updated</a>
                    </div>
                </div>
            </div>
        </nav>
    );
}
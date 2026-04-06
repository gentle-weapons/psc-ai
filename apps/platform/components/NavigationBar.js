// A component for the navigation bar

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './NavigationBar.module.css';

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <nav>
            <div className="container">
                <div className={styles.navInner}>
                    <Link href="/" className={styles.logo}>
                        ReviewMyAgent
                    </Link>
                    <div className={styles.statusContainer}>
                        <div className={styles.statusDot}/>
                        <span className={styles.statusText}> 
                            {pathname === '/developer' && 'Developer Dashboard'}
                            {pathname === '/consumer' && 'Consumer Dashboard'}
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
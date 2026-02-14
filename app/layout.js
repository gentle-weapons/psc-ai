import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import './landing.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata = {
  title: 'ReviewMyAgent — AI Agent Evaluation Platform',
  description: 'ReviewMyAgent combines real human feedback with hard quantitative data to give you the most complete picture of how an AI agent actually performs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable}`}>
      <body style={{ fontFamily: 'var(--font-roboto), sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
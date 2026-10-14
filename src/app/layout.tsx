import type { Metadata, Viewport } from 'next';
import { JetBrains_Mono, Manrope, Unbounded } from 'next/font/google';
import './globals.css';

const disp = Unbounded({ subsets: ['latin', 'cyrillic'], weight: ['400', '600', '800'], variable: '--font-disp' });
const body = Manrope({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '700'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin', 'cyrillic'], weight: ['400', '600'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Rodjer — Software Engineer Portfolio',
  description:
    'Software Engineer: React/Angular frontends, Java/Spring Boot and Go backends, multi-agent AI systems. Projects: ding, Driver Diary, YARD’A, Event Manager.',
  openGraph: {
    title: 'Rodjer — Software Engineer Portfolio',
    description: 'React/Angular, Java/Spring Boot, Go, multi-agent AI systems.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#0A0B0F'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${disp.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/global/Navbar';
import Context from '@/context/context';

// const inter = Inter({ subsets: ["latin"] });
const manrope = Manrope({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rastro Ai',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${manrope.className}`}>
        <Context>
          <div className={`mx-auto px-5 md:px-10`}>
            <Navbar />
            {children}
          </div>
        </Context>
      </body>
    </html>
  );
}

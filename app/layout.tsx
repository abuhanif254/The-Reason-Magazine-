import type {Metadata} from 'next';
import './globals.css';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AuthProvider } from '@/components/AuthProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';
import { Inter, Space_Grotesk, Outfit, Hind_Siliguri } from 'next/font/google';
import { ConsoleFilter } from '@/components/ConsoleFilter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali', 'latin'],
  variable: '--font-bengali',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://reasonmagazine.com'),
  title: {
    template: '%s | Reason Magazine',
    default: 'Reason Magazine | Atheism Activism & Rational Discourse',
  },
  description: 'A professional, dynamic magazine-style blog focused on atheism activism, rational discourse, secular advocacy, and science.',
  keywords: ['Atheism', 'Secularism', 'Rationalism', 'Science', 'Activism', 'Bangla Articles', 'Philosophy'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'bn_BD',
    url: '/',
    title: 'Reason Magazine | Atheism Activism & Rational Discourse',
    description: 'A professional, dynamic magazine-style blog focused on atheism activism, rational discourse, secular advocacy, and science.',
    siteName: 'Reason Magazine',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reason Magazine | Atheism Activism & Rational Discourse',
    description: 'A professional, dynamic magazine-style blog focused on atheism activism, rational discourse, secular advocacy, and science.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'uvOAa9Wo8Z4loKdyDTwiSM4Be7tn29bIdIlTTonUmXM',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable} ${outfit.variable} ${hindSiliguri.variable}`}>
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950 transition-colors duration-300 font-sans">
        <ConsoleFilter />
        <ErrorBoundary>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            <AuthProvider>
              <Suspense fallback={<div className="h-20 bg-white dark:bg-zinc-950 border-b border-gray-200 dark:border-zinc-800" />}>
                <Header />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

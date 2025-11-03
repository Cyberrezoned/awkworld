import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FloatingNav from '@/components/layout/floating-nav';
import { AppRouterAnimatePresence } from '@/components/AppRouterAnimatePresence';

export const metadata: Metadata = {
  title: 'Awkward: Elegance in Motion',
  description: 'An immersive fashion experience with AI-powered styling and visualization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col')}>
        <Header />
        <main className="flex-1">
          <AppRouterAnimatePresence>{children}</AppRouterAnimatePresence>
        </main>
        <Footer />
        <FloatingNav />
        <Toaster />
      </body>
    </html>
  );
}

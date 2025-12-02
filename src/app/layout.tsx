import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { AppRouterAnimatePresence } from '@/components/AppRouterAnimatePresence';

export const metadata: Metadata = {
  title: 'AWKWorld | Global Fashion, African Excellence',
  description: 'A global fashion movement that merges Afro-modern aesthetics with international luxury style. Delivered to you, anywhere in Nigeria.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased min-h-screen flex flex-col bg-background')}>
        <Header />
        <main className="flex-1">
          <AppRouterAnimatePresence>{children}</AppRouterAnimatePresence>
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Logo from '@/components/icons/logo';

const navItems = [
  { href: '/products', label: 'New Arrivals' },
  { href: '/products?category=awkworld-women', label: "AWKWorld Women" },
  { href: '/products?category=awkworld-men', label: "AWKWorld Men" },
  { href: '/products?category=awkworld-streetwear', label: 'Streetwear' },
  { href: '/delivery', label: 'Nationwide Delivery' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <div className="md:flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2">
                <Logo className="text-foreground" />
            </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 justify-center">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative font-medium text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary flex items-center gap-2',
                  pathname === item.href && 'text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        
        <div className="md:flex-1 flex justify-end">
            {/* Future icons like search, cart, user can go here */}
        </div>
      </div>
    </header>
  );
}

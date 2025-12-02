import { Github, Twitter, Instagram } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/icons/logo';

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Instagram, href: '#', name: 'Instagram' },
  { icon: Github, href: '#', name: 'Github' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 py-12 bg-background">
      <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
           <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-auto text-foreground" />
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs text-center md:text-left">
            The future of fashion, today.
          </p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Link key={link.name} href={link.href} aria-label={link.name}
                className="text-muted-foreground transition-colors hover:text-primary">
                <link.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>
           <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Awkward Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import { Bot } from 'lucide-react';
import StylistForm from './stylist-form';

export default function StylistPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 relative">
          <Bot className="w-16 h-16 mx-auto text-primary" />
          <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">AI Stylist</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Get personalized, luxury outfit suggestions based on your style, the occasion, and the latest high-fashion trends.
          </p>
        </div>
        <StylistForm />
      </div>
    </div>
  );
}

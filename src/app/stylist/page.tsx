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
            Your personal AI stylist. Get outfit suggestions based on your body type, current weather, and the latest fashion trends.
          </p>
        </div>
        <StylistForm />
      </div>
    </div>
  );
}

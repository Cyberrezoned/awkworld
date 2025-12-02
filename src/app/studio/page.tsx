import { Video } from 'lucide-react';
import MockupGenerator from './mockup-generator';

export default function StudioPage() {
  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 relative">
           <Video className="w-16 h-16 mx-auto text-primary" />
          <h1 className="mt-6 font-headline text-4xl md:text-6xl font-bold tracking-tight">AI Product Studio</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Visualize your fashion ideas. Generate stunning, animated product mockups from simple descriptions using generative AI.
          </p>
        </div>
        <MockupGenerator />
      </div>
    </div>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function ProductsPage() {
  const products = PlaceHolderImages;

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore the intersection of avant-garde design and cutting-edge technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:border-primary/30">
            <div className="aspect-square relative overflow-hidden">
              <Image
                src={product.imageUrl}
                alt={product.description}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={product.imageHint}
              />
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <h2 className="font-headline text-2xl font-semibold flex-1">{product.description}</h2>
              <Button variant="outline" asChild className="mt-4 self-start transition-all hover:bg-primary/10 hover:text-primary-foreground hover:border-primary">
                <Link href="#">
                  View Product <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

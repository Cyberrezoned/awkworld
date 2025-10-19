
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const ProductCard = ({ product }: { product: ImagePlaceholder }) => {
  return (
    <Link href="#" className="group block">
      <Card className="overflow-hidden border-none shadow-none rounded-none bg-transparent h-full flex flex-col">
        <div className="aspect-[3/4] relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        <CardContent className="p-4 text-center bg-card">
          <h3 className="font-headline text-lg font-medium text-foreground truncate">{product.description}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <p className="font-semibold text-foreground mt-2">${product.price?.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

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

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

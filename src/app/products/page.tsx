
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProductCard = ({ product }: { product: ImagePlaceholder }) => {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <Card className="overflow-hidden border-border/50 shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg bg-card h-full flex flex-col">
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
        <CardContent className="p-4 text-center">
          <h3 className="font-headline text-lg font-medium text-foreground truncate">{product.description}</h3>
          <p className="text-muted-foreground text-sm">{product.category}</p>
          <p className="font-semibold text-foreground mt-2">${product.price?.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const productsPerPage = 8;
  
  const totalProducts = PlaceHolderImages.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const paginatedProducts = PlaceHolderImages.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">Our Collection</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore the intersection of avant-garde design and cutting-edge technology.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="flex justify-center items-center gap-6 mt-16">
        <Button 
          variant="outline"
          onClick={() => router.push(createPageURL(currentPage - 1))}
          disabled={currentPage <= 1}
        >
          <ArrowLeft className="mr-2" />
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button 
          variant="outline"
          onClick={() => router.push(createPageURL(currentPage + 1))}
          disabled={currentPage >= totalPages}
        >
          Next
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}

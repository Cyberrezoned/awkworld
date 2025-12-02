
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }: { product: ImagePlaceholder }) => {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden group h-full flex flex-col shadow-none bg-transparent border-none rounded-none">
          <div className="aspect-[3/4] relative overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.description}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              data-ai-hint={product.imageHint}
            />
          </div>
          <CardContent className="p-4 text-left bg-transparent">
            <h3 className="font-headline text-lg font-medium leading-tight text-foreground">
              {product.description}
            </h3>
            <p className="mt-2 text-base text-primary">${product.price.toFixed(2)}</p>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const productsPerPage = 8;
  const currentPage = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category');

  const filteredProducts = category 
    ? PlaceHolderImages.filter(p => p.category.toLowerCase().includes(category))
    : PlaceHolderImages;

  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
  
  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="bg-background">
        <div className="container py-16 md:py-24">
            <div className="text-center mb-16">
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight">The Collection</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
                  An exclusive curation of ready-to-wear, accessories, and fine jewelry. Each piece a statement.
                </p>
            </div>

            <motion.div 
                className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16"
                initial="initial"
                animate="animate"
                variants={{
                    animate: { transition: { staggerChildren: 0.1 } }
                }}
            >
                {paginatedProducts.map((product) => (
                <motion.div
                    key={product.id}
                    variants={{
                        initial: { opacity: 0, y: 20 },
                        animate: { opacity: 1, y: 0 }
                    }}
                >
                    <ProductCard product={product} />
                </motion.div>
                ))}
            </motion.div>
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-6 mt-20">
                  <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(createPageURL(currentPage - 1))}
                  disabled={currentPage <= 1}
                  className="w-36 font-headline tracking-wider rounded-full transition-all hover:border-primary hover:text-primary"
                  >
                  <ArrowLeft className="mr-2" />
                  Previous
                  </Button>
                  <span className="text-base text-muted-foreground font-medium">
                  Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(createPageURL(currentPage + 1))}
                  disabled={currentPage >= totalPages}
                  className="w-36 font-headline tracking-wider rounded-full transition-all hover:border-primary hover:text-primary"
                  >
                  Next
                  <ArrowRight className="ml-2" />
                  </Button>
              </div>
            )}
            </div>
    </div>
  );
}

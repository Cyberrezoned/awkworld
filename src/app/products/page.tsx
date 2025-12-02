
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ShoppingCart, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const ProductCard = ({ product }: { product: ImagePlaceholder }) => {
  return (
    <Link href={`/products/${product.id}`} className="group block">
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden group h-full flex flex-col shadow-lg bg-card/80 backdrop-blur-sm border-white/10 transition-all duration-300 hover:border-primary/60 hover:shadow-primary/20">
          <motion.div
            className="aspect-[3/4] relative overflow-hidden"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{
                rotateY: 15,
                rotateX: -10,
                scale: 1.05,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut',
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.description}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                data-ai-hint={product.imageHint}
              />
               <Badge variant="secondary" className="absolute top-3 left-3 bg-black/50 text-white border-white/20">
                <ShieldCheck className="w-3 h-3 mr-1.5"/> NFT
               </Badge>
            </motion.div>
          </motion.div>
          <CardContent className="p-4 text-center flex-1 flex flex-col justify-center bg-card/20">
            <h3 className="font-headline text-lg font-semibold flex-1 leading-tight text-foreground">
              {product.description}
            </h3>
            <div className="mt-4 flex justify-between items-center">
                 <p className="font-semibold text-lg text-primary">${product.price.toFixed(2)}</p>
                 <Button size="icon" variant="ghost" className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary">
                    <ShoppingCart className="h-4 w-4" />
                 </Button>
            </div>
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

  const totalProducts = PlaceHolderImages.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = PlaceHolderImages.slice(startIndex, endIndex);
  
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
                className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16"
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
            </div>
    </div>
  );
}

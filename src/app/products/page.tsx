'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

const ProductCard = ({ product }: { product: (typeof PlaceHolderImages)[0] }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;

    const rotateX = (y / (height / 2)) * -10;
    const rotateY = (x / (width / 2)) * 10;
    setRotate({ x: rotateX, y: rotateY });
  };

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
      }}
      className="w-full h-full transition-transform duration-300 ease-out"
    >
      <Card className="overflow-hidden group flex flex-col h-full bg-card/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 relative">
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-lg transition-all duration-300 pointer-events-none -z-10 group-hover:scale-105"></div>
        <div
          style={{ transform: 'translateZ(20px)' }}
          className="aspect-square relative overflow-hidden"
        >
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            data-ai-hint={product.imageHint}
          />
        </div>
        <CardContent 
          style={{ transform: 'translateZ(30px)' }}
          className="p-6 flex-1 flex flex-col bg-card/80 backdrop-blur-sm">
          <h2 className="font-headline text-2xl font-semibold flex-1">{product.description}</h2>
          <Button variant="outline" asChild className="mt-4 self-start transition-all hover:bg-primary/10 hover:text-primary-foreground hover:border-primary">
            <Link href="#">
              View Product <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

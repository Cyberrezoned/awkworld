
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlaceHolderImages, ImagePlaceholder } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const product = PlaceHolderImages.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    setIsAdding(true);
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${product.description}`,
    });
    setTimeout(() => {
        setIsAdding(false);
    }, 1500)
  };


  return (
    <div className="container mx-auto py-12 md:py-20">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start"
      >
        <div className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-xl">
          <Image
            src={product.imageUrl}
            alt={product.description}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            data-ai-hint={product.imageHint}
          />
        </div>

        <div className="flex flex-col h-full pt-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">{product.category}</p>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight my-2">{product.description}</h1>
            <p className="text-3xl font-semibold mb-6">${product.price.toFixed(2)}</p>
          </div>
          
          <Separator className="my-6" />

          <div className="space-y-4 text-muted-foreground">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            <p>
              This is a placeholder description for the {product.description}. 
              Crafted with the finest materials and an eye for modern aesthetics, this piece is a testament to timeless style and exceptional quality. 
              Its versatile design allows it to be a staple in any wardrobe, transcending seasons and trends.
            </p>
          </div>

          <Separator className="my-8"/>

          <div className="flex items-center gap-4 mb-8">
            <p className="text-sm font-medium text-foreground">Quantity:</p>
            <div className="flex items-center border border-input rounded-md">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="w-4 h-4" />
              </Button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full font-headline tracking-wider text-base" onClick={handleAddToCart} disabled={isAdding}>
            {isAdding ? (
              <>
                <Check className="mr-2 h-5 w-5" />
                Added!
              </>
            ) : (
               <>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </>
            )}
          </Button>

          <div className="mt-auto pt-8 text-xs text-muted-foreground space-y-2">
              <p>Free shipping on orders over $50.</p>
              <p>Hassle-free returns within 30 days.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

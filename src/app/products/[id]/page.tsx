
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingCart, View, Loader, ShieldCheck, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';


const ThreeDViewModal = ({ open, onOpenChange, product }: { open: boolean, onOpenChange: (open: boolean) => void, product: any }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl h-[80vh] bg-black/80 backdrop-blur-xl border-primary/30 text-white flex flex-col data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0">
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-primary flex items-center gap-3">
                        <View className="w-6 h-6" />
                        360° View: {product.description}
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        This is a placeholder for an interactive 3D model viewer.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div
                        animate={{ rotateY: 360 }}
                        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                        style={{ perspective: '1000px' }}
                    >
                        <motion.div
                            style={{transformStyle: 'preserve-3d', rotateY: 0}}
                        >
                            <Image src={product.imageUrl} alt={product.description} width={300} height={400} className="rounded-lg shadow-2xl shadow-primary/20" />
                        </motion.div>
                    </motion.div>
                    <h3 className="text-xl font-semibold mt-8">Interactive 3D Model Coming Soon</h3>
                    <Loader className="w-6 h-6 animate-spin mt-4 text-primary" />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [is3DViewOpen, setIs3DViewOpen] = useState(false);

  const product = PlaceHolderImages.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }
  
  const handleAddToCart = () => {
    setIsAdding(true);
    toast({
      title: "Added to Bag",
      description: `${quantity} x ${product.description}`,
      className: 'bg-background border-primary/50',
    });
    setTimeout(() => {
        setIsAdding(false);
    }, 1500)
  };


  return (
    <>
      <ThreeDViewModal open={is3DViewOpen} onOpenChange={setIs3DViewOpen} product={product} />
      <div className="container mx-auto py-12 md:py-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start"
        >
          <div className="aspect-[3/4] relative overflow-hidden rounded-md">
            <Image
              src={product.imageUrl}
              alt={product.description}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              data-ai-hint={product.imageHint}
            />
            <Badge variant="secondary" className="absolute top-4 left-4 text-sm bg-black/50 text-white border-white/20">
              Ships to all locations in Nigeria
             </Badge>
          </div>

          <div className="flex flex-col h-full pt-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-muted-foreground">{product.category}</p>
              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight my-2">{product.description}</h1>
              <p className="text-3xl font-semibold mb-6 text-primary">₦{product.price.toLocaleString()}</p>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                This is a placeholder for the AWKWorld styling notes. This {product.description} is a statement piece that blends global trends with Afro-modernist design. 
                Crafted with the finest materials and an eye for artistic detail, this piece is a testament to timeless style and exceptional quality. 
              </p>
            </div>

            <Separator className="my-8" />

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

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                 <Button size="lg" className="flex-1 font-headline tracking-wider text-base bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105 hover:drop-shadow-glow-gold" onClick={handleAddToCart} disabled={isAdding}>
                    {isAdding ? (
                    <>
                        <Check className="mr-2 h-5 w-5" />
                        Added!
                    </>
                    ) : (
                    <>
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Bag
                    </>
                    )}
                </Button>
                 <Button size="lg" variant="outline" className="flex-1 font-headline tracking-wider text-base transition-all hover:scale-105 hover:border-primary hover:text-primary hover:drop-shadow-glow-gold" onClick={() => setIs3DViewOpen(true)}>
                    <View className="mr-2 h-5 w-5" />
                    360° View
                </Button>
            </div>

            <div className="mt-auto pt-8 text-xs text-muted-foreground space-y-2">
                <p>Free standard shipping on all orders in Nigeria.</p>
                <p>Duties and taxes are included.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const ProductCard = ({ product }: { product: any }) => {
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
            </motion.div>
          </motion.div>
          <CardContent className="p-4 text-center flex-1 flex flex-col justify-center bg-card/20">
            <h3 className="font-headline text-lg font-semibold flex-1 leading-tight text-foreground">
              {product.description}
            </h3>
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold text-lg text-primary">
                ${product.price.toFixed(2)}
              </p>
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-primary/10 text-primary hover:bg-primary/20 hover:text-primary"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};


export default function Home() {
  const products = PlaceHolderImages.slice(0, 4);

  return (
    <div className="flex flex-col items-center text-foreground overflow-x-hidden bg-background">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center relative text-center px-4 overflow-hidden"
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 10, ease: 'easeOut', delay: 0.5 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion editorial background"
            fill
            className="object-cover"
            priority
            data-ai-hint="fashion editorial"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/40 z-5"></div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-8xl font-bold z-10 tracking-tight text-white drop-shadow-lg"
        >
          Elegance in Motion
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/80 z-10"
        >
          An immersive fashion experience with AI-powered styling and 3D visualization.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10"
        >
          <Button asChild size="lg" className="font-headline text-base tracking-wider transition-all hover:scale-105 bg-white/90 text-black hover:bg-white drop-shadow-glow-gold">
            <Link href="/products">Explore The Collection <ArrowRight className="ml-2" /></Link>
          </Button>
        </motion.div>
      </motion.section>
      
      {/* Featured Products */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="w-full py-20 md:py-32 px-4 bg-background"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeIn} className="text-center font-headline text-4xl md:text-5xl font-bold tracking-tight">New Arrivals</motion.h2>
          <motion.p variants={fadeIn} className="text-center mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A curated selection of our most distinctive and sought-after designs.
          </motion.p>
          <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeIn}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}

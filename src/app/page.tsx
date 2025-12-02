
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
        <Image
          src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion editorial background"
          fill
          className="object-cover"
          priority
          data-ai-hint="fashion editorial"
        />
        <div className="absolute inset-0 bg-white/30 z-5"></div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-8xl font-bold z-10 tracking-tight text-foreground"
        >
          The Art of Style
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-foreground/80 z-10"
        >
          Discover curated collections where timeless design meets modern artistry.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10"
        >
          <Button asChild size="lg" className="font-headline text-base tracking-wider transition-all hover:scale-105 bg-foreground text-background hover:bg-foreground/90">
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
                <Link href={`/products/${product.id}`} className="group block">
                  <Card className="overflow-hidden group h-full flex flex-col shadow-none transition-shadow duration-300 border-none rounded-none bg-card">
                      <div className="aspect-[3/4] relative overflow-hidden">
                      <Image
                        src={product.imageUrl}
                        alt={product.description}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        data-ai-hint={product.imageHint}
                      />
                    </div>
                    <CardContent className="p-4 text-center flex-1 flex flex-col justify-center bg-background">
                      <h3 className="font-headline text-lg font-semibold flex-1 leading-tight">{product.description}</h3>
                      <p className="mt-2 font-semibold text-muted-foreground">${product.price.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

    </div>
  );
}

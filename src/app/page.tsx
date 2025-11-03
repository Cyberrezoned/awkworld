
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Video } from 'lucide-react';
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
  const products = PlaceHolderImages.slice(0, 8);

  return (
    <div className="flex flex-col items-center text-foreground overflow-x-hidden">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center relative text-center px-4 overflow-hidden"
      >
        <Image
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Fashion background"
            fill
            className="object-cover object-top"
            priority
          />
        <div className="absolute inset-0 bg-black/50 z-5"></div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-8xl lg:text-9xl font-bold z-10 tracking-tight text-white"
        >
          Elegance in Motion
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 z-10"
        >
          Discover curated collections where timeless design meets modern artistry.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10"
        >
          <Button asChild size="lg" className="font-headline text-base tracking-wider transition-all hover:scale-105 bg-white text-black hover:bg-white/90">
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
          <motion.h2 variants={fadeIn} className="text-center font-headline text-4xl md:text-5xl font-bold tracking-tight">Featured Pieces</motion.h2>
          <motion.p variants={fadeIn} className="text-center mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A curated selection of our most distinctive and sought-after designs.
          </motion.p>
          <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeIn} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="overflow-hidden group h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300 border-border/50 bg-card">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={product.imageHint}
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-headline text-lg font-semibold flex-1 leading-tight">{product.description}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                    <p className="mt-2 font-semibold">${product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* AI Stylist & Studio CTA */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="w-full py-20 md:py-32 px-4 bg-secondary/50"
      >
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
            {/* AI Stylist */}
            <motion.div variants={fadeIn} className="text-center lg:text-left">
                <Bot className="w-16 h-16 mx-auto lg:mx-0 text-primary"/>
                <h2 className="mt-6 font-headline text-4xl md:text-5xl font-bold tracking-tight">AI Stylist</h2>
                <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                    Our intelligent stylist offers personalized recommendations to help you discover looks that are uniquely you.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="font-headline transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105">
                        <Link href="/stylist">Consult The Stylist <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </motion.div>
            {/* AI Studio */}
            <motion.div variants={fadeIn} className="text-center lg:text-left">
                <Video className="w-16 h-16 mx-auto lg:mx-0 text-primary"/>
                <h2 className="mt-6 font-headline text-4xl md:text-5xl font-bold tracking-tight">AI Product Studio</h2>
                <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                   Visualize your ideas instantly. Generate stunning, animated product mockups from simple descriptions using generative AI.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="font-headline transition-all hover:bg-primary hover:text-primary-foreground hover:scale-105">
                        <Link href="/studio">Enter the Studio <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

    
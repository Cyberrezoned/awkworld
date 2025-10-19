'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Shirt } from 'lucide-react';
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
        className="w-full h-[calc(100vh-80px)] flex flex-col justify-center items-center relative text-center px-4"
      >
        <div className="absolute inset-0 bg-grid-small-black/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-8xl lg:text-9xl font-bold z-10 tracking-tighter"
        >
          Elegance in Motion
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground z-10"
        >
          Discover a new dimension of style. Where technology and high fashion converge into a singular, breathtaking experience.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10"
        >
          <Button asChild size="lg" className="font-headline transition-all hover:scale-105 hover:drop-shadow-glow-gold bg-foreground text-background hover:bg-foreground/80">
            <Link href="/products">Explore Collection <ArrowRight className="ml-2" /></Link>
          </Button>
        </motion.div>
      </motion.section>

      {/* 3D Showcase Placeholder */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="w-full py-20 md:py-32 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <motion.div variants={fadeIn} className="lg:w-1/2">
            <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Immersive 3D Showcase</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Experience our collection like never before. Our interactive 3D viewer brings every detail to life with dynamic lighting and true-to-life materials.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center">
                <Shirt className="w-6 h-6 text-primary" />
              </div>
              <span className="font-headline text-lg">See every stitch, feel every texture.</span>
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="lg:w-1/2 w-full h-96">
            <Card className="w-full h-full bg-card/50 border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 bg-grid-small-black/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_60%,white)]"></div>
              <div className="text-center text-muted-foreground">
                <p className="font-headline text-2xl">[ Interactive 3D Model ]</p>
                <p className="text-sm mt-2">Coming soon to a screen near you.</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>
      
      {/* Featured Products */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="w-full py-20 md:py-32 px-4 bg-secondary"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2 variants={fadeIn} className="text-center font-headline text-4xl md:text-5xl font-bold tracking-tight">Featured Pieces</motion.h2>
          <motion.p variants={fadeIn} className="text-center mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A curated selection from our latest collection, embodying the spirit of awkward elegance.
          </motion.p>
          <motion.div variants={staggerContainer} className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeIn} whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300 }}>
                <Card className="overflow-hidden group h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={product.imageUrl}
                      alt={product.description}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      data-ai-hint={product.imageHint}
                    />
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col bg-card">
                    <h3 className="font-headline text-lg font-semibold flex-1 leading-tight">{product.description}</h3>
                    <Button variant="link" asChild className="mt-4 p-0 h-auto self-start text-primary">
                      <Link href="/products">View Details <ArrowRight className="ml-2" /></Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* AI Stylist CTA */}
      <motion.section
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
        className="w-full py-20 md:py-32 px-4"
      >
        <div className="max-w-4xl mx-auto text-center relative">
           <div className="absolute -inset-8 top-1/2 -translate-y-1/2 bg-accent/10 rounded-full blur-3xl -z-10"></div>
           <motion.div variants={fadeIn}>
            <Bot className="w-16 h-16 mx-auto text-accent drop-shadow-glow-violet"/>
           </motion.div>
          <motion.h2 variants={fadeIn} className="mt-6 font-headline text-4xl md:text-5xl font-bold tracking-tight">Meet Your AI Stylist</motion.h2>
          <motion.p variants={fadeIn} className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            The Awkward Assistant combines your unique profile with real-time trend and weather data to curate looks that are perfectly you.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-8">
            <Button asChild size="lg" variant="outline" className="font-headline transition-all hover:bg-accent/10 hover:text-accent-foreground hover:border-accent hover:scale-105">
              <Link href="/stylist">Get Style Advice <ArrowRight className="ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}


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
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        >
          <source src="https://videos.pexels.com/video-files/7578544/7578544-hd_1920_1080_25fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/70 z-5"></div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-8xl lg:text-9xl font-bold z-10 tracking-tighter text-white"
        >
          Welcome to AWKWORLD
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/80 z-10"
        >
          Step into a new dimension of style. An immersive world where avant-garde fashion and digital identity collide.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10"
        >
          <Button asChild size="lg" className="font-headline transition-all hover:scale-105 hover:drop-shadow-glow-gold bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/products">Explore The Realms <ArrowRight className="ml-2" /></Link>
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
          <motion.h2 variants={fadeIn} className="text-center font-headline text-4xl md:text-5xl font-bold tracking-tight">Realms of Style</motion.h2>
          <motion.p variants={fadeIn} className="text-center mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Explore curated collections from the different realms of AWKWORLD, where each piece tells a story.
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
        className="w-full py-20 md:py-32 px-4 relative overflow-hidden"
      >
        <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute z-0 w-auto min-w-full min-h-full max-w-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
        >
            <source src="https://videos.pexels.com/video-files/8064834/8064834-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-background/80 z-5"></div>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10">
            {/* AI Stylist */}
            <motion.div variants={fadeIn} className="text-center lg:text-left">
                <Bot className="w-16 h-16 mx-auto lg:mx-0 text-accent drop-shadow-glow-violet"/>
                <h2 className="mt-6 font-headline text-4xl md:text-5xl font-bold tracking-tight">The Oracle</h2>
                <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                    In AWKWORLD, The Oracle is your guide. An AI stylist that intuits your aesthetic, crafting looks that are both visionary and uniquely you.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="font-headline transition-all hover:bg-accent/10 hover:text-accent hover:border-accent hover:scale-105">
                        <Link href="/stylist">Consult The Oracle <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </motion.div>
            {/* AI Studio */}
            <motion.div variants={fadeIn} className="text-center lg:text-left">
                <Video className="w-16 h-16 mx-auto lg:mx-0 text-primary drop-shadow-glow-gold"/>
                <h2 className="mt-6 font-headline text-4xl md:text-5xl font-bold tracking-tight">The Creator's Forge</h2>
                <p className="mt-4 max-w-2xl mx-auto lg:mx-0 text-lg text-muted-foreground">
                   Forge your own reality. Generate stunning, animated product mockups from simple descriptions using generative AI.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" variant="outline" className="font-headline transition-all hover:bg-primary/10 hover:border-primary hover:scale-105">
                        <Link href="/studio">Enter the Forge <ArrowRight className="ml-2" /></Link>
                    </Button>
                </div>
            </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

    
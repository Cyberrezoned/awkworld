
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Truck } from 'lucide-react';
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


export default function Home() {
  const featuredProducts = PlaceHolderImages.filter(p => p.category === "Women's Fashion" || p.category === "Men's Fashion").slice(0, 4);

  return (
    <div className="flex flex-col items-center text-foreground bg-background">
      {/* Hero Section */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={staggerContainer}
        className="w-full h-screen flex flex-col justify-center items-center relative text-center px-4"
      >
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Luxury fashion model"
            fill
            className="object-cover"
            priority
            data-ai-hint="luxury fashion editorial"
          />
           <div className="absolute inset-0 bg-black/50 z-5"></div>
        </div>

        <motion.h1
          variants={fadeIn}
          className="font-headline text-5xl md:text-7xl font-bold z-10 tracking-tight text-white drop-shadow-md"
        >
          The Height of Luxury Fashion
        </motion.h1>
        <motion.p
          variants={fadeIn}
          className="mt-4 max-w-2xl text-lg md:text-xl text-white/90 z-10"
        >
          Discover curated collections from the world's most renowned designers. Delivered to you, anywhere in Nigeria.
        </motion.p>
        <motion.div
          variants={fadeIn}
          className="mt-8 z-10 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="font-headline text-base tracking-wider transition-all hover:scale-105 bg-white text-black hover:bg-gray-200">
            <Link href="/products?category=women">Shop Women</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-headline text-base tracking-wider transition-all hover:scale-105 border-white text-white hover:bg-white/10">
            <Link href="/products?category=men">Shop Men</Link>
          </Button>
        </motion.div>
      </motion.section>
      
      {/* Featured Products */}
      <section className="w-full py-20 md:py-32 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.h2 initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true, amount: 0.5}} className="text-center font-headline text-4xl md:text-5xl font-medium tracking-tight">New Arrivals</motion.h2>
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer} 
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeIn}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div variants={fadeIn} className="mt-16 text-center">
            <Button asChild size="lg" variant="outline" className="font-headline text-base tracking-wider transition-all hover:scale-105 hover:bg-accent">
                <Link href="/products">Explore The Full Collection <ArrowRight className="ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Nationwide Delivery Section */}
      <section className="w-full py-20 md:py-24 px-4 bg-accent/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <motion.div initial={{opacity: 0, x: -50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true, amount: 0.5}} className="relative aspect-square max-w-md mx-auto w-full">
            <Image
                src="https://images.unsplash.com/photo-1590422348373-853f935398a6?q=80&w=2835&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Map of Nigeria"
                fill
                className="object-cover rounded-full shadow-2xl"
                data-ai-hint="delivery map"
              />
          </motion.div>
          <motion.div initial={{opacity: 0, x: 50}} whileInView={{opacity: 1, x: 0}} viewport={{once: true, amount: 0.5}} className="text-center md:text-left">
            <Truck className="h-12 w-12 text-primary mx-auto md:mx-0"/>
            <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight mt-4">Delivering Luxury, Nationwide</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              From Lagos to Kano, Abuja to Port Harcourt, and everywhere in between. LuxeNaija delivers to every state and local government area in Nigeria. Your finest fashion is now within reach.
            </p>
            <Button asChild size="lg" variant="link" className="font-headline text-base tracking-wider mt-4 px-0">
                <Link href="/delivery">Learn More About Our Delivery <ArrowRight className="ml-2" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>

    </div>
  );
}


'use client';

import { motion } from 'framer-motion';
import { Truck, MapPin, PackageCheck } from 'lucide-react';

const statesOfNigeria = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi",
  "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo",
  "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara", "FCT"
];

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function DeliveryPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container py-16 md:py-24">
        {/* Header Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Truck className="w-20 h-20 mx-auto text-primary" />
          <h1 className="mt-6 font-headline text-5xl md:text-7xl font-bold tracking-tight">AWKWorld Delivery Across Nigeria</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            AWKWorld is proud to offer premium, reliable, and secure delivery to every corner of Nigeria. Your style is guaranteed, no matter your location.
          </p>
        </motion.div>

        {/* Coverage Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <h2 className="font-headline text-3xl md:text-4xl text-center font-medium mb-10">Our Unrivaled Coverage</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {statesOfNigeria.map((state, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex items-center gap-3 p-3 bg-accent/50 rounded-lg"
              >
                <MapPin className="h-5 w-5 text-primary" />
                <span className="font-medium">{state}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8 text-sm">
            We deliver to all 36 states and the Federal Capital Territory, including all 774 local government areas.
          </p>
        </motion.div>

        {/* Delivery Options Section */}
        <div className="mt-24 max-w-5xl mx-auto">
            <h2 className="font-headline text-3xl md:text-4xl text-center font-medium mb-12">Our Delivery Promise</h2>
            <div className="grid md:grid-cols-2 gap-8 text-center">
                <motion.div initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true, amount: 0.5}} className="p-8 border border-border rounded-lg bg-background">
                    <PackageCheck className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-headline text-2xl font-medium">Standard, Express & Next-Day</h3>
                    <p className="text-muted-foreground mt-2">
                        Choose what works for you. Get your order in 2-5 business days with Standard, within 48 hours with Express, or Next-Day in Lagos & Abuja.
                    </p>
                </motion.div>
                <motion.div initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true, amount: 0.5}} className="p-8 border border-border rounded-lg bg-background">
                    <PackageCheck className="h-10 w-10 text-primary mx-auto mb-4" />
                    <h3 className="font-headline text-2xl font-medium">Secure & Insured</h3>
                    <p className="text-muted-foreground mt-2">
                        Every package is fully insured from our door to yours. We partner with premium logistics providers to ensure your items arrive in perfect condition.
                    </p>
                </motion.div>
            </div>
        </div>
      </div>
    </div>
  );
}

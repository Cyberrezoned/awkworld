
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Wand2 } from 'lucide-react';

import { generateProductMockup } from '@/ai/flows/generate-product-mockups';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

const formSchema = z.object({
  productName: z.string().min(1, 'Garment name is required.'),
  productDescription: z.string().min(1, 'A description is required.'),
  productFeatures: z.string().min(1, 'Please list at least one feature.'),
  style: z.string().min(1, 'Style is required.'),
});

type MockupResult = {
  mockupVideo: string;
  description: string;
};

export default function MockupGenerator() {
  const [result, setResult] = useState<MockupResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: 'Cyber-Noir Trench Coat',
      productDescription: 'A sleek, water-resistant trench coat with an asymmetric cut, high collar, and subtle holographic accents. Made for the modern urban explorer.',
      productFeatures: 'Graphene-infused fabric, magnetic closures, interior device pockets',
      style: 'Futuristic, cyberpunk, elegant',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const result = await generateProductMockup({
        ...values,
        productFeatures: values.productFeatures.split(',').map((f) => f.trim()),
      });
      setResult(result);
    } catch (e) {
      setError('Failed to generate mockup. The AI may be busy, please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Describe Your Garment</CardTitle>
        <CardDescription>Describe a fashion item and our AI will create a video mockup.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Garment / Accessory Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Chrono-Weave Jacket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Visual Style</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Minimalist, Haute Couture" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="productDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fashion Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="A detailed description of the garment's look, feel, and material." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features to Highlight (comma-separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Asymmetric cut, Silk lining, Custom hardware" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-headline transition-all hover:scale-105 hover:drop-shadow-glow-gold">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                'Forge Animation'
              )}
            </Button>
          </form>
        </Form>

        <AnimatePresence>
          {(isLoading || result || error) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {isLoading && (
                 <div className="w-full text-center p-4 rounded-lg bg-background">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
                    <h3 className="font-headline text-lg">AI generation in progress...</h3>
                    <p className="text-muted-foreground mt-1">This may take up to a minute. Please don't close this page.</p>
                    <Progress value={undefined} className="mt-4 h-2 animate-pulse" />
                 </div>
              )}
              {error && <p className="text-destructive text-center">{error}</p>}
              {result && (
                <Card className="bg-background border-primary/50 shadow-lg shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                      <Wand2 className="h-5 w-5" />
                      Generated Product Mockup
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                        <video src={result.mockupVideo} controls autoPlay loop className="w-full h-full object-cover" />
                    </div>
                    <p className="text-lg">{result.description}</p>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';

import { getOutfitSuggestion, OutfitSuggestionInput } from '@/ai/flows/get-outfit-suggestion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  bodyType: z.string().min(1, 'Please select a body type.'),
  weather: z.string().min(1, 'Please describe the weather.'),
  trendData: z.string().min(1, 'Please describe the current trends.'),
});

export default function StylistForm() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bodyType: '',
      weather: 'Sunny, 25°C',
      trendData: 'Minimalist, Y2K',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSuggestion(null);
    setError(null);
    try {
      const result = await getOutfitSuggestion(values as OutfitSuggestionInput);
      setSuggestion(result.outfitSuggestion);
    } catch (e) {
      setError('Failed to get suggestion. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Create Your Look</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="bodyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your body type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="athletic">Athletic</SelectItem>
                        <SelectItem value="curvy">Curvy</SelectItem>
                        <SelectItem value="slim">Slim</SelectItem>
                        <SelectItem value="pear">Pear</SelectItem>
                        <SelectItem value="apple">Apple</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weather"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weather Conditions</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rainy, 15°C" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="trendData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fashion Trends</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Streetwear, Gorpcore" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto font-headline transition-all hover:scale-105 hover:drop-shadow-glow-gold">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Styling...
                </>
              ) : (
                'Get Suggestion'
              )}
            </Button>
          </form>
        </Form>
        
        <AnimatePresence>
          {(isLoading || suggestion || error) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {isLoading && (
                 <div className="flex items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Our AI is crafting the perfect look for you...</span>
                 </div>
              )}
              {error && <p className="text-destructive text-center">{error}</p>}
              {suggestion && (
                <Card className="bg-background border-primary/50 shadow-lg shadow-primary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl text-primary">
                      <Sparkles className="h-5 w-5" />
                      Your AI-Curated Outfit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg whitespace-pre-wrap">{suggestion}</p>
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

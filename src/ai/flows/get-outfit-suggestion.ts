'use server';
/**
 * @fileOverview Outfit suggestion flow using user body type, weather, and trend data.
 *
 * - getOutfitSuggestion - A function that returns outfit suggestions.
 * - OutfitSuggestionInput - The input type for the getOutfitSuggestion function.
 * - OutfitSuggestionOutput - The return type for the getOutfitSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutfitSuggestionInputSchema = z.object({
  bodyType: z.string().describe('The user\u2019s body type (e.g., athletic, curvy, slim).'),
  weather: z.string().describe('The current weather conditions (e.g., sunny, rainy, cold).'),
  trendData: z.string().describe('Current fashion trends (e.g., streetwear, minimalist, vintage).'),
});
export type OutfitSuggestionInput = z.infer<typeof OutfitSuggestionInputSchema>;

const OutfitSuggestionOutputSchema = z.object({
  outfitSuggestion: z.string().describe('A detailed outfit suggestion based on the input parameters.'),
});
export type OutfitSuggestionOutput = z.infer<typeof OutfitSuggestionOutputSchema>;

export async function getOutfitSuggestion(input: OutfitSuggestionInput): Promise<OutfitSuggestionOutput> {
  return getOutfitSuggestionFlow(input);
}

const outfitSuggestionPrompt = ai.definePrompt({
  name: 'outfitSuggestionPrompt',
  input: {schema: OutfitSuggestionInputSchema},
  output: {schema: OutfitSuggestionOutputSchema},
  prompt: `You are a personal stylist, provide an outfit suggestion based on the following information:

Body Type: {{{bodyType}}}
Current Weather: {{{weather}}}
Current Fashion Trends: {{{trendData}}}

Outfit Suggestion:`,
});

const getOutfitSuggestionFlow = ai.defineFlow(
  {
    name: 'getOutfitSuggestionFlow',
    inputSchema: OutfitSuggestionInputSchema,
    outputSchema: OutfitSuggestionOutputSchema,
  },
  async input => {
    const {output} = await outfitSuggestionPrompt(input);
    return output!;
  }
);

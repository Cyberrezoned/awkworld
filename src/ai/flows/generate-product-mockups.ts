
'use server';
/**
 * @fileOverview Flow for generating animated product mockups from product data using AI.
 *
 * - generateProductMockup - A function that generates product mockups.
 * - GenerateProductMockupInput - The input type for the generateProductMockup function.
 * - GenerateProductMockupOutput - The return type for the generateProductMockup function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductMockupInputSchema = z.object({
  productName: z.string().describe('The name of the fashion product.'),
  productDescription: z.string().describe('A detailed description of the fashion product.'),
  productFeatures: z.array(z.string()).describe('A list of key features to highlight in the video.'),
  style: z.string().describe('The desired visual style for the mockup (e.g., minimalist, futuristic, haute couture).'),
});
export type GenerateProductMockupInput = z.infer<typeof GenerateProductMockupInputSchema>;

const GenerateProductMockupOutputSchema = z.object({
  mockupVideo: z.string().describe('A video mockup of the product as a data URI.'),
  description: z.string().describe('A description of the generated mockup.'),
});
export type GenerateProductMockupOutput = z.infer<typeof GenerateProductMockupOutputSchema>;

export async function generateProductMockup(input: GenerateProductMockupInput): Promise<GenerateProductMockupOutput> {
  return generateProductMockupFlow(input);
}

const generateProductMockupFlow = ai.defineFlow(
  {
    name: 'generateProductMockupFlow',
    inputSchema: GenerateProductMockupInputSchema,
    outputSchema: GenerateProductMockupOutputSchema,
  },
  async input => {
    const prompt = `Create a cinematic, professional fashion product video.
    Product Name: ${input.productName}.
    Description: ${input.productDescription}.
    Key Features to visually highlight: ${input.productFeatures.join(', ')}.
    The visual style should be: ${input.style}.
    The video should showcase the garment on a simple, elegant background, focusing on texture, cut, and movement. Emphasize luxury and craftsmanship.`;

    // Use Veo to generate the video.
    let { operation } = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: prompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video || !video.media?.url) {
      throw new Error('Failed to find the generated video');
    }

    const fetch = (await import('node-fetch')).default;
    // Add API key before fetching the video.
    const videoDownloadResponse = await fetch(
      `${video.media.url}&key=${process.env.GEMINI_API_KEY}`
    );
    if (
      !videoDownloadResponse ||
      videoDownloadResponse.status !== 200 ||
      !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }

    // Read the video into a buffer and convert to Base64
    const videoBuffer = await videoDownloadResponse.arrayBuffer();
    const base64Video = Buffer.from(videoBuffer).toString('base64');
    const mockupVideo = `data:${video.media.contentType || 'video/mp4'};base64,${base64Video}`;

    const description = `An animated mockup of ${input.productName} showcasing its key features in a ${input.style} style.`;

    return { mockupVideo, description };
  }
);

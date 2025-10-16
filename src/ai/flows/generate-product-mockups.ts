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
  productName: z.string().describe('The name of the product.'),
  productDescription: z.string().describe('A detailed description of the product.'),
  productFeatures: z.array(z.string()).describe('A list of key features of the product.'),
  style: z.string().describe('The desired style for the mockup (e.g., minimalist, futuristic, elegant).'),
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

const prompt = ai.definePrompt({
  name: 'generateProductMockupPrompt',
  input: {schema: GenerateProductMockupInputSchema},
  output: {schema: GenerateProductMockupOutputSchema},
  prompt: `You are an expert in creating product mockups. Based on the product data provided, generate a visually appealing and engaging animated mockup.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}
Key Features: {{#each productFeatures}}{{{this}}}, {{/each}}
Style: {{{style}}}

Create a video mockup that showcases the product and its features in the specified style. Also, write a brief description of the generated mockup.

Ensure the mockup is suitable for sharing with marketing teams for visualization and feedback.`,
});

const generateProductMockupFlow = ai.defineFlow(
  {
    name: 'generateProductMockupFlow',
    inputSchema: GenerateProductMockupInputSchema,
    outputSchema: GenerateProductMockupOutputSchema,
  },
  async input => {
    // Use Veo to generate the video.
    let { operation } = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: input.productName + ", " + input.productDescription + ", style=" + input.style,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes. Note that this may take some time, maybe even up to a minute. Design the UI accordingly.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }

    const fetch = (await import('node-fetch')).default;
    // Add API key before fetching the video.
    const videoDownloadResponse = await fetch(
      `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
    );
    if (
      !videoDownloadResponse ||
      videoDownloadResponse.status !== 200 ||
      !videoDownloadResponse.body
    ) {
      throw new Error('Failed to fetch video');
    }

    const fs = require('fs');
    const util = require('util');

    const pipeline = util.promisify(require('stream').pipeline);
    const pathToOutputFile = `/tmp/${input.productName.replace(/[^a-zA-Z0-9]/g, '')}.mp4`;

    await pipeline(videoDownloadResponse.body, fs.createWriteStream(pathToOutputFile));

    const base64Video = fs.readFileSync(pathToOutputFile, {encoding: 'base64'});
    const mockupVideo = `data:video/mp4;base64,${base64Video}`;

    const description = `An animated mockup of ${input.productName} showcasing its key features in a ${input.style} style.`;

    return { mockupVideo, description };
  }
);

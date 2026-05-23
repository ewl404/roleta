'use server';
/**
 * @fileOverview An AI agent that provides suggestions for roulette wheel entries based on a user prompt.
 *
 * - suggestWheelEntries - A function that handles the wheel entry suggestion process.
 * - SuggestWheelEntriesInput - The input type for the suggestWheelEntries function.
 * - SuggestWheelEntriesOutput - The return type for the suggestWheelEntries function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestWheelEntriesInputSchema = z.object({
  userPrompt: z
    .string()
    .describe('The user\'s prompt or topic for wheel entry suggestions.'),
});
export type SuggestWheelEntriesInput = z.infer<
  typeof SuggestWheelEntriesInputSchema
>;

const SuggestWheelEntriesOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of suggested entries for a roulette wheel.'),
});
export type SuggestWheelEntriesOutput = z.infer<
  typeof SuggestWheelEntriesOutputSchema
>;

export async function suggestWheelEntries(
  input: SuggestWheelEntriesInput
): Promise<SuggestWheelEntriesOutput> {
  return suggestWheelEntriesFlow(input);
}

const suggestWheelEntriesPrompt = ai.definePrompt({
  name: 'suggestWheelEntriesPrompt',
  input: {schema: SuggestWheelEntriesInputSchema},
  output: {schema: SuggestWheelEntriesOutputSchema},
  prompt: `You are an AI assistant specialized in generating creative and relevant suggestions for a roulette wheel.
Based on the user's prompt, provide a list of diverse and interesting entries for the wheel.

User's prompt: "{{{userPrompt}}}"

Please provide your suggestions as a JSON array of strings, under the key 'suggestions'. Example: { "suggestions": ["Item 1", "Item 2"] }`,
});

const suggestWheelEntriesFlow = ai.defineFlow(
  {
    name: 'suggestWheelEntriesFlow',
    inputSchema: SuggestWheelEntriesInputSchema,
    outputSchema: SuggestWheelEntriesOutputSchema,
  },
  async input => {
    const {output} = await suggestWheelEntriesPrompt(input);
    return output!;
  }
);

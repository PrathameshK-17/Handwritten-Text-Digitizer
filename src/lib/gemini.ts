import { GoogleGenerativeAI } from '@google/generative-ai';

export async function completeTextWithGemini(extractedText: string): Promise<string> {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) {
        throw new Error('Gemini API Key is missing');
    }

    const genAI = new GoogleGenerativeAI(API_KEY);


    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const prompt = `
      You are an expert editor and grammar checker.
      The following text was extracted from an image using OCR and may contain missing words, incomplete sentences, or typos.
      Your task is to:
      1. Detect missing words or incomplete sentences.
      2. Generate a clean, grammatically correct version of the text.
      3. Do NOT add any introductory or concluding remarks. Just provide the corrected text.
      4. Maintain the original meaning and context.

      Extracted Text:
      "${extractedText}"

      Corrected Text:
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text.trim();
    } catch (error) {
        console.error('Gem- model API Error:', error);
        throw new Error('Failed to process text with Gem model MI');
    }
}

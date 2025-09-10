
import { GoogleGenAI } from "@google/genai";
import type { Entity } from '../types';

// IMPORTANT: This key is managed by the execution environment. Do not hardcode.
const API_KEY = import.meta.env.VITE_API_KEY;

let ai: GoogleGenAI | null = null;

if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.warn("Gemini API key not found in environment variables. AI features will not work.");
}

export const getSummaryForEntity = async (entity: Entity): Promise<string> => {
  if (!ai) {
    return "AI analysis is unavailable: API key is not configured.";
  }

  const model = 'gemini-2.5-flash';
  
  const prompt = `
    Analyze the following business entity located in Algeria and provide a concise, professional summary in a single paragraph.

    Entity Details:
    - Name: "${entity.name}"
    - Address: "${entity.address}"
    - Website: ${entity.website || 'Not available'}
    - Phone: ${entity.phone || 'Not available'}

    Based on these details, describe its likely business type, services, or products.
    Infer its purpose from its name and location if other details are scarce.
    The tone should be that of an expert business intelligence analyst. Do not repeat the input details.
    `;

  try {
    const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          temperature: 0.3,
          topP: 0.9,
          topK: 20,
        }
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    return "Could not generate AI summary due to an error.";
  }
};

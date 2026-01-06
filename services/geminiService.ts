
import { GoogleGenAI, Type } from "@google/genai";
import { UnitContent, PracticeQuestion } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generatePracticeQuestions(unit: UnitContent): Promise<PracticeQuestion[]> {
    const prompt = `Act as an ESL teacher for kids. Create 3 simple English practice questions for a child learning "Kids Box" Unit ${unit.id}: ${unit.title}. 
    Theme: ${unit.theme}. 
    Vocabulary: ${unit.vocabulary.join(', ')}. 
    Grammar: ${unit.grammar.join(', ')}.
    The questions should be fun and easy to understand for primary school students.`;

    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "Must have 3 options."
              },
              correctAnswer: { type: Type.STRING },
              explanation: { type: Type.STRING, description: "A simple explanation why it's correct." }
            },
            required: ["question", "options", "correctAnswer", "explanation"]
          }
        }
      }
    });

    try {
      return JSON.parse(response.text || "[]");
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      return [];
    }
  }

  async getChatResponse(unit: UnitContent, userMessage: string): Promise<string> {
    const chat = this.ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are a friendly English teacher for children helping with Kids Box Unit ${unit.id}: ${unit.title}. 
        Keep your language very simple, use emojis, and be encouraging. 
        Focus on the vocabulary: ${unit.vocabulary.join(', ')} and grammar: ${unit.grammar.join(', ')}.`
      }
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "Sorry, I couldn't understand that. Let's try again!";
  }
}

export const geminiService = new GeminiService();

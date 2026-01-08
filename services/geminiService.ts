import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedOrder, Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateOrderPrediction = async (language: Language): Promise<GeneratedOrder | null> => {
  const langNames: Record<Language, string> = {
    en: 'English',
    es: 'Spanish',
    zh: 'Mandarin Chinese',
    fr: 'French'
  };
  
  const targetLang = langNames[language];

  if (!apiKey) {
    console.warn("API Key is missing. Returning mock data.");
    const mocks: Record<Language, GeneratedOrder> = {
      en: { item: "Spicy Tuna Crispy Rice", restaurant: "Momoya SoHo", eta: "14 mins", vibe: "You seem stressed. Treating you to comfort food." },
      es: { item: "Tacos Al Pastor", restaurant: "Los Tacos No. 1", eta: "14 min", vibe: "Pareces estresado. Te mereces comida reconfortante." },
      zh: { item: "辣金枪鱼脆米", restaurant: "Momoya SoHo", eta: "14 分钟", vibe: "你看起压力很大，吃点好的放松一下。" },
      fr: { item: "Croissant au Jambon", restaurant: "Balthazar", eta: "14 min", vibe: "Vous semblez stressé. Un peu de réconfort s'impose." }
    };
    return mocks[language];
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a hyper-specific, fictional food delivery prediction for a busy New Yorker right now.
    It should include a specific food item, a trendy NYC restaurant name (real or realistic sounding), an ETA (between 12-25 mins), and a "vibe" reason why the AI chose this (e.g., "It's raining", "You walked 10k steps").
    
    IMPORTANT: The 'item', 'eta', and 'vibe' fields MUST be translated into ${targetLang}. The 'restaurant' name should remain in its original name (usually English/Proper Noun).

    Return strictly JSON.`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            item: { type: Type.STRING },
            restaurant: { type: Type.STRING },
            eta: { type: Type.STRING },
            vibe: { type: Type.STRING },
          },
          required: ["item", "restaurant", "eta", "vibe"]
        }
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text) as GeneratedOrder;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};
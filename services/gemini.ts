import { GoogleGenAI } from "@google/genai";

// Always use a named parameter and obtain API key exclusively from process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateScript = async (prompt: string): Promise<string> => {
  // Use gemini-3-pro-preview for complex tasks like code generation.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a Lua script for Roblox based on this request: ${prompt}. Return ONLY the code, no markdown blocks, no extra text.`,
    config: {
      temperature: 0.7,
      maxOutputTokens: 1000,
    },
  });
  // Access text property directly, do not call it as a function.
  return response.text?.trim() || "-- Failed to generate script";
};

export const explainScript = async (code: string): Promise<string> => {
  // Use gemini-3-pro-preview for complex tasks like code explanation.
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Explain how this Roblox Lua script works in simple terms: \n\n${code}`,
    config: {
      temperature: 0.5,
      maxOutputTokens: 500,
    },
  });
  // Access text property directly, do not call it as a function.
  return response.text?.trim() || "No explanation available.";
};

export const chatWithAI = async (history: { role: 'user' | 'assistant', content: string }[], message: string): Promise<string> => {
  // Use gemini-3-pro-preview for coding-related assistant.
  const chat = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: 'You are DeltaAI, an expert in Roblox Lua scripting and game optimization. Help users create, debug, and understand scripts. Keep answers concise and helpful.',
    },
  });

  // chat.sendMessage accepts the message parameter.
  const response = await chat.sendMessage({ message });
  // Access text property directly.
  return response.text || "I'm sorry, I couldn't process that.";
};
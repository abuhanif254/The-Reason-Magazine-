import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export async function generateSummary(content: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Summarize the following article in exactly two sentences. Focus on the core message and impact. \n\nContent: ${content}`,
      config: {
        systemInstruction: "You are a professional editor for Reason Magazine, a secular and rationalist publication. Your tone is intellectual, clear, and direct.",
      }
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "";
  }
}

export async function suggestRelatedArticles(currentPost: { title: string, content: string, category: string }, allPosts: { slug: string, title: string, category: string }[]) {
  try {
    const postsContext = allPosts.map(p => `- ${p.title} (slug: ${p.slug}, category: ${p.category})`).join('\n');
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the current article titled "${currentPost.title}", suggest up to 3 related articles from the list below. Return ONLY the slugs as a JSON array of strings.
      
      List of available articles:
      ${postsContext}
      
      Current Article Content Snippet: ${currentPost.content.substring(0, 1000)}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    
    const slugs = JSON.parse(response.text || "[]");
    return slugs as string[];
  } catch (error) {
    console.error("Gemini Related Articles Error:", error);
    return [];
  }
}

export async function refineTone(content: string, targetTone: string = "impactful activism") {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Refine the following text to have a more ${targetTone} tone. Keep the core arguments but make the language more persuasive, rational, and powerful. \n\nText: ${content}`,
      config: {
        systemInstruction: "You are a world-class speechwriter and activism consultant. You specialize in secularism, human rights, and rationalist philosophy.",
      }
    });
    return response.text?.trim() || "";
  } catch (error) {
    console.error("Gemini Tone Refinement Error:", error);
    return content;
  }
}

// utils/geminiAPI.ts
import { GoogleGenAI } from "@google/genai";

interface GenerateContentParams {
  topic: string;
  category: string;
  level: string;
}

/**
 * Generates content using Google Gemini API
 * @param params - Topic, category, and level for content generation
 * @param apiKey - Google Gemini API key
 * @returns Generated text content
 */
export async function generateContent(
  params: GenerateContentParams,
  apiKey: string
): Promise<string> {
  if (!apiKey) {
    throw new Error("API key is missing");
  }

  const { topic, category, level } = params;

  // Initialize the Gemini API client
  const genAI = new GoogleGenAI({ apiKey });

  // Create structured JSON prompt
  const promptData = {
    task: "Write",
    category: category,
    level: level,
    topic: topic,
    rules: {
      general: [
        "Do not use special characters like *, **, #, > or markdown formatting.",
        "Do not add extra phrases like 'Here is your essay' or 'Certainly'.",
        "Follow Bangladesh study standard strictly.",
      ],
      Paragraph: {
        words: "200-300",
        structure: "One paragraph only",
        intro: "Start with introduction based on the topic, e.g., what is it.",
      },
      Dialogue: {
        words: "200-400",
        start: "Hi, Hello, Good morning, Good afternoon or Good noon",
        characters:
          "Two characters with names before sentences (e.g., Roman: Hi, Musarof: Hello),always use name`Roman`",
      },
      Report: {
        words: "120-150",
        person: "No first person (I, We)",
        voice: "Passive or indirect speech",
        parts: "Maximum 2",
        heading: "Staff/Reporter/Name, Place, Date (like application style)",
      },
      Essay: {
        words: "Minimum 600",
      },
      Application: {
        format: "Formal",
        zip: "Zip code not needed",
        start: "Start with Date",
      },
      Email: {
        words: "Maximum 200",
      },
      Summary: {
        words: "100-200",
      },
      Story: {
        words: "Minimum 400",
      },
      Notice: {
        heading: {
          left: "No.ABC/1110/Year",
          right: "Date: day month year",
        },
        body: "Main part of notice",
        footer: "Name then Position (e.g., Roman Howladar, Headmaster)",
      },
    },
  };

  // Convert to string for the prompt
  const prompt = JSON.stringify(promptData);

  try {
    // Using the modern @google/genai library approach
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!response || !response.text) {
      throw new Error("Empty or invalid response from API");
    }

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Try fallback to direct API call if the library fails
    return generateContentFallback(prompt, apiKey);
  }
}

/**
 * Fallback method using direct API call if the library fails
 */
async function generateContentFallback(
  prompt: string,
  apiKey: string
): Promise<string> {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API request failed: ${response.status} - ${errorData}`);
  }

  const data = await response.json();

  if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
    throw new Error("Invalid response format from API");
  }

  const text = data.candidates[0].content.parts[0].text;
  if (!text) {
    throw new Error("Empty text in API response");
  }

  return text;
}

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type SearchParams = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  color?: string;
  query?: string;
};

export async function parseAISearch(query: string): Promise<SearchParams> {
  if (!query || query.length < 5) return { query };

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `Extract search parameters from the user query. Categories: Home Decor, Furniture, Wedding, Fashion, Handmade. 
          Return ONLY a JSON object with: category, minPrice, maxPrice, color, query.
          Example: "Something blue under 5000" -> {"color": "blue", "maxPrice": 5000}`
        },
        { role: "user", content: query }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    return result;
  } catch (error) {
    console.error("AI Search Error:", error);
    return { query };
  }
}

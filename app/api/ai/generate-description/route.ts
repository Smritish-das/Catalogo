import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateSchema = z.object({
  input: z.string().min(10),
  tone: z.enum(["Luxury", "Minimal", "Elegant", "Modern", "Playful"]).default("Luxury"),
  platform: z.enum(["Instagram", "Website", "WhatsApp", "Facebook"]).default("Website"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = generateSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json({ error: "Invalid input", details: validated.error.format() }, { status: 400 });
    }

    const { input, tone, platform } = validated.data;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a premium product copywriter for a high-end digital showroom. 
          Generate a compelling product title, description, Instagram caption, and hashtags based on the user input.
          
          Tone: ${tone}
          Target Platform: ${platform}
          
          The tone should be ${tone.toLowerCase()} and sophisticated.
          
          Return a JSON object with: 
          - title: A catchy product name
          - description: A sophisticated product description
          - caption: A social media caption tailored for ${platform}
          - hashtags: An array of 5-8 relevant hashtags
          - suggestedCategory: A one-word category name
          - suggestedTags: An array of 3-5 tags for the product`
        },
        { role: "user", content: input }
      ],
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content || "{}");
    return NextResponse.json(content);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
  }
}

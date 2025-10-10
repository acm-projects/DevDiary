import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTags(title, content) {
  try {
    const prompt = `You are a software debugger that is trying to teach this newbie why 
    his code sucks and is not working. 
    Given an error message (and optional code), then identify the core ideas.
    Return JSON with:
    - "core_tags": 3 short tags (comma separated)
    - "summary": one short sentence summarizing it
    - "explanation": a short one-sentence explanation of possible directions.
    This is what you are given:
    Title: ${title}
    Error/Code: ${content}`;

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "developer",
          content: prompt,
        },
      ],
    });

    const text = response.choices[0].message.content.trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

import OpenAI from "openai";
import dotenv from 'dotenv';
import Log from "./Log.js";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function search(title, content) {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });

    const prompt = `You are a software debugger that is trying to teach this newbie why 
    his code sucks and is not working. 
    Given an error message (and optional code), then identify the core ideas.
    Return JSON with:
    - "similar_ids": Get the 3 ids from the most similar logs (comma separated)

    This is what you are given:
    Title: ${title}
    Error/Code: ${content}
    Here are all previous logs for context: ${JSON.stringify(logs)}`;

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

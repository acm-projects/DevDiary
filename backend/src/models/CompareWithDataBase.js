import OpenAI from "openai";
import dotenv from 'dotenv';
import Log from "./Log.js";
import { search } from "./SearchFeature.js";  
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateStuffWithLogs(title, content) {
  try {

    const { similar_logs } = await search(content);

    const matchedLogs = await Log.find(
      { _id: { $in: similar_logs } },
      { title: 1, content: 1 }
    );

    const logs = await Log.find().sort({ createdAt: -1 });

    const prompt = `You are a software debugger that is trying to teach this newbie why 
    his code sucks and is not working. 
    It is important that you complete this fast. At max 2 seconds. Accurary is less important than time.
    Given an error message (and optional code), then identify the core ideas.
    Return JSON with:
    - "core_tags": 3 short tags (comma separated)
    - "summary": one short sentence summarizing it
    - "explanation": a short one-sentence explanation of possible directions.
    - "similar_logs": Get the 3 ids from the most similar logs (comma separated)
    This is what you are given:
    Title: ${title}
    Error/Code: ${content}
    
    Here are the most similar logs:
    ${matchedLogs.map(l => `id: ${l._id}\ncontent: ${l.content}`).join("\n")}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
        {
          role: "user",
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

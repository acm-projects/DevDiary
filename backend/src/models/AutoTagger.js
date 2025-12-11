import OpenAI from "openai";
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateTags(title, sections) {
  try {
    console.log("SECTIONS",sections);
    const prompt = `You are a software debugger that is trying to teach this newbie why 
    his code sucks and is not working. Be very specific. Don't just say to check for uninstantiated variables. Actually look at the code.
    Given an error message (and optional code), then identify the core ideas.
    Return JSON with:
    - "core_tags": 3 tags each 11 characters or shorter (comma separated)
    - "summary": two sentences summarizing it
    - "explanation": a two sentence explanation of what exactly is wrong and how to fix it.
    This is what you are given:
    Title: ${title}
    Error/Code: ${JSON.stringify(sections)}`;

    console.log(prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-nano",
      messages: [
        {
          role: "developer",
          content: prompt,
        }
      ],
    });

    const text = response.choices[0].message.content.trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

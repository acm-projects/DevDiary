import OpenAI from "openai";
import Log from "./Log.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function search(searchContent) {
  try {
    const embeddingRes = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: searchContent,
    });
    const queryEmbedding = embeddingRes.data[0].embedding;

    const logs = await Log.find({}, { embedding: 1 });

    logs.forEach((log, idx) => {
    console.log(`Log ${idx}:`, {
      id: log._id.toString(),
      embeddingLength: log.embedding?.length || 0,
      isArray: Array.isArray(log.embedding),
    });
  });

    const similarities = logs.map((log) => ({
      id: log._id,
      similarity: cosineSimilarity(queryEmbedding, log.embedding),
    }));

    similarities.sort((a, b) => b.similarity - a.similarity);
    const similar_logs = similarities.slice(0, 3).map((s) => s.id);
    console.log("Similar logs found:", similar_logs);
    return { similar_logs };
  } catch (err) {
    console.error("Search error:", err);
    throw err;
  }
}

// does the work lol
function cosineSimilarity(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) return 0;
  if (a.length === 0 || b.length === 0) return 0;
  if (a.length !== b.length) return 0;

  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < a.length; i++) {
    const ai = a[i];
    const bi = b[i];
    dot += ai * bi;
    magA += ai * ai;
    magB += bi * bi;
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

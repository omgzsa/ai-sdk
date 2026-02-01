import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

const model = google('gemini-2.5-flash');

const { text } = await generateText({
    model: model,
    prompt: 'Who is the strongest superhero of all time? Be concise.',
});

console.log(text);
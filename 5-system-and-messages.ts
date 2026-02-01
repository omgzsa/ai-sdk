import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

const model = google('gemini-2.5-flash');

const { text } = await generateText({
    model: model,
    system: 'Address the user by the name.',
    messages: [
        { role: "user", content: "Hi, my name is András" },
        { role: "assistant", content: "Hi, András! How can I help you today?" },
        { role: "user", content: "Who is the strongest superhero and why?." },
    ],
});

console.log(text);
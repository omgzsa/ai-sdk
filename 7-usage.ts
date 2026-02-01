import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import fs from "fs";
// const image = fs.readFileSync("./image.jpg");

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

const model = google('gemini-2.5-flash');

const result = await generateText({
    model: model,
    prompt: "Who is the most powerful superhero and why? Be concise."
});

console.log(result.usage);
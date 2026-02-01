import { generateText, stepCountIs } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import fs from "node:fs";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const model = google('gemini-2.5-flash');

const result = await generateText({
    model: model,
    tools: {
        google_search: google.tools.googleSearch({}),
    },
    stopWhen: stepCountIs(3),
    prompt: "I live in Tuscaloosa, AL. What should I do this weekend?",
});

fs.writeFileSync("14-result.json", JSON.stringify(result, null, 2));
console.log(result.text);
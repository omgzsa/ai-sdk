import { generateText, stepCountIs, tool } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";
import fs from "node:fs";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const model = google('gemini-2.5-flash');

const getFileContentsTool = tool({
    description: "Get the contents of a file",
    inputSchema: z.object({
        filePath: z.string(),
    }),
    execute: async ({ filePath }) => {
        const fileContents = fs.readFileSync(filePath, "utf8");
        return fileContents;
    },
});

const result = await generateText({
    model: model,
    prompt: "What is the code in 7-usage.ts doing?",
    stopWhen: stepCountIs(2),
    tools: {
        getFileContentsTool: getFileContentsTool,
    },
});

console.log(result.content);
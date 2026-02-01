import { streamText, Output } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { z } from "zod";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const model = google('gemini-2.5-flash');

const { partialOutputStream } = streamText({
    model: model,
    output: Output.array({
        element: z.object({
            name: z.string(),
            superpowers: z
                .array(z.string())
                .max(3)
                .describe("The character's superpowers. Maximum 3."),
            weaknesses: z.array(z.string()),
            backstory: z
                .string()
                .describe(
                    "A short paragraph about how the character got their powers and what they are known for."
                ),
            alignment: z.enum(["good", "evil", "neutral"]),
        }),
    }),
    prompt: "Give me a list of 5 comic book characters",
});

for await (const item of partialOutputStream) {
    console.log(item);
}
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import fs from "node:fs";

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

const model = google('gemini-2.5-flash-image');

const result = await generateText({
    model: model,
    prompt: "Generate pencil or charcoal sketch of a girl petting a dachshund-foxi mixed breed dog. In anime style."
});

for (const file of result.files) {
    if (file.mediaType.startsWith("image/")) {
        const randomId = crypto.randomUUID();
        if (!fs.existsSync("images/gemini")) {
            fs.mkdirSync("images/gemini", { recursive: true });
        }
        const filename = `images/gemini/${randomId}.png`;
        fs.writeFileSync(`images/gemini/${randomId}.png`, file.uint8Array);
        console.log("Generated image:", filename);
    }
}
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
// import fs from "fs";
// const image = fs.readFileSync("./image.jpg");

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });

const model = google('gemini-2.5-flash');

const result = await generateText({
    model: model,
    system: 'Address the user by the name.',
    messages: [
        {
            role: "user",
            content: [
                { type: "image", image: "https://picsum.photos/200/300" },
                // { type: "image", image: image.toString('base64') },
                { type: "text", text: "Describe this image. Be concise." },
            ]
        },
    ],
});

console.log(result);
import { generateText, type ToolSet, stepCountIs } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMCPClient } from "@ai-sdk/mcp"
import fs from "node:fs";

// const mcpServer = await createMCPClient({});

const google = createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY });
const model = google('gemini-2.5-flash');

const mcpClient = await createMCPClient({
    transport: {
        type: "http",
        url: "https://ui.nuxt.com/mcp",

        //optional: configure HTTP headers
        //  headers: { Authorization: 'Bearer my-api-key' },
        //optional: provide an OAuth client provider for automatic authorization
        //  authProvider: myOAuthClientProvider,
    },
});

const tools = (await mcpClient.tools()) as ToolSet;

const result = await generateText({
    model: model,
    prompt: "List 10 Nuxt UI components with markdown formatting.",
    tools,
    stopWhen: stepCountIs(2),
    onFinish: async () => {
        await mcpClient.close();
    },
});
fs.writeFileSync("15-result.json", JSON.stringify(result, null, 2));
console.log(result.text);
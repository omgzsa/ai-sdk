import { createGoogleGenerativeAI } from "@ai-sdk/google";

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
console.log('Fetching available models...\n');

// Make a direct API call to list models
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey);
const data = await response.json();

if (data.models) {
    console.log('Available models:');
    data.models
        .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
        .forEach((model: any) => {
            console.log(`- ${model.name.replace('models/', '')}`);
        });
} else {
    console.log('Error:', data);
}

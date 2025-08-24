import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai_key = process.env.VITE_OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: openai_key,
});

const imagePath = "./src/utils/wound1.jpg";
const base64Image = fs.readFileSync(imagePath, "base64");

export async function getWoundAnalysis(){
const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: [
        {
            role: "user",
            content: [
                { 
                    type: "input_text", 
                    text: "Analyze this wound image. Describe wound characteristics including: size estimation (in cm), color, visible signs of infection, and recommended care level (minor/moderate/severe). Respond in JSON format with these keys: size, color, infectionRisk, severity, careRecommendations."
                },
                {
                    type: "input_image",
                    image_url: `data:image/jpeg;base64,${base64Image}`,
                },
            ],
        },
    ],
});


return response;
// console.log(response.output_text);
}

getWoundAnalysis();
import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import fs from "fs";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// MongoDB connection
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/mediReach');
}
main()
  .then(() => {
    console.log("MongoDB connected..");
  })
  .catch(err => console.log(err));

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
});

// POST endpoint for wound analysis
app.post("/analyze-image", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const imagePath = req.file.path;

  try {
    // Read and encode the image
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    // Make the OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this wound image. Describe wound characteristics including: size estimation (in cm), color, visible signs of infection, Prescription, and recommended care level (minor/moderate/severe). Respond in JSON format with these keys: size, color, infectionRisk, severity, Prescription, careRecommendations."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0].message.content;
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch (e) {
      console.error("OpenAI response is not valid JSON:", content);
      return res.status(500).json({ error: "Invalid response from OpenAI" });
    }

    res.json(parsed);
    
  } catch (error) {
    console.error("Analysis failed:", error);
    
    // More specific error messages
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({ error: "Invalid OpenAI API key" });
    } else if (error.code === 'model_not_found') {
      return res.status(500).json({ error: "Model not available" });
    } else {
      return res.status(500).json({ error: "Analysis failed: " + error.message });
    }
  } finally {
    // Clean up uploaded file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }
});

// GET endpoint (for testing)
app.get("/analyze-image", (req, res) => {
  res.json({ message: "Wound analysis API is running. Use POST to analyze images." });
});

// Start server
app.listen(8080, () => {
  console.log(`App is listening on port 8080..`);
});
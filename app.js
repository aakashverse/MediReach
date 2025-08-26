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

app.get("/signup",(req,res)=>{
  const data = req.body;
  console.log(data);
})


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

// POST for text 
app.post("/analyze-text", async (req, res) => {
  const userQuery = req.body.text;
  console.log(userQuery);

  if (!userQuery) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    // Make the OpenAI API call
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are a medical assistant. Analyze the user's symptoms and respond ONLY with a JSON object using the following keys:\n\n- 'possibleConditions' (string): List likely medical conditions based on symptoms.\n- 'urgency' (string): Describe how urgent the condition is (e.g. \"emergency\", \"see a doctor within 24 hours\", \"mild/self-treatable\").\n- 'recoverySuggestions' (string): Provide general suggestions for recovery at home.\n- 'recommendations' (string): Mention next steps including whether to see a doctor, specialist, or go to the ER.\n- 'prescription' (string): Suggest possible over-the-counter or commonly prescribed medications (include a disclaimer to consult a doctor before use).\n- 'testsAndCheckups' (string): Suggest relevant diagnostic tests, screenings, or physical exams.\n- 'speedyRecoveryTips' (string): Provide practical tips to help the user recover faster.\n\nTailor the response based on what the user is likely trying to understand: what’s wrong, how serious it is, what to do next, and how to feel better quickly.\n\nReturn only a valid JSON object. Do NOT include any explanation or text outside the JSON.",
        },
        {
          role: "user",
          content: userQuery,
        },
      ],
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    console.log(content);
    
    let parsed;
    try {
      const jsonMatch = content.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonText = jsonMatch ? jsonMatch[1] : content;
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
  }
});


app.get("/analyze-text", (req, res) => {
  res.json({ message: "Wound analysis API is running. Use POST to analyze text." });
});


// GET endpoint (for testing)
app.get("/analyze-image", (req, res) => {
  res.json({ message: "Symptom analysis API is running. Use POST /analyze-text with a JSON body containing a 'text' field to analyze symptoms." });
});

// Start server
app.listen(8080, () => {
  console.log(`App is listening on port 8080..`);
});
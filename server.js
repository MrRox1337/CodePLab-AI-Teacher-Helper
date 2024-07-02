// CodePLab AI Teacher Helper
// Technical Challenge
// Made by: Aman Mishra
//
// Server side connection with ChatGPT API to pull information for the teacher for the lesson plan.
// The user will input the course topic information and will receive a generated output containing
// Learning Objectives, Materials Needed, Lesson Procedure, Assessment, and Differentiation.
//
//-------------- Setup Instructions ----------//
//
// Step 1: Run the following code on terminal first
// npm install express body-parser openai dotenv
//
// Step 2: Create a .env file containing your OPENAI_API_KEY from
// https://platform.openai.com/api-keys and save the file in the same level as server.js
//
// Step 3: Run the following code to run the application
// node server.js
//
//-------------- Code Begins -----------------//

// Imports and initialization
import express, { response } from "express";
import bodyParser from "body-parser";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));

// Function to interact with OpenAI API and get a response to a prompt.
// Expected JSON containing an attribute of the following format:
// { "body": { "text" : "YOUR_TOPIC_HERE" } }
// Return a JSON object of the following format:
// { "resp": OPENAI_RESPONSE_JSON_HERE }
async function callAPI(request, response) {
    let topic = request.body.text;

    let prompt = `Create a lesson plan for the topic "${topic}" with the following subheadings: Learning Objectives, Materials Needed, Lesson Procedure, Assessment, Differentiation. The topics must strictly contain the above headings to standardize output.`;

    try {
        const apiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.2,
            max_tokens: 500,
        });
        response.status(200).json({ resp: apiResponse });
    } catch (err) {
        response.status(500).json(err.message);
    }
}

// Routing for webservice and frontend calls
app.post("/generateLessonPlan", callAPI);

// Express application run
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

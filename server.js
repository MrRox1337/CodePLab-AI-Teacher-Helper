// Server side connection with ChatGPT API to pull information for the teacher for the lesson plan.
// The user will input the course topic information and will receive a generated output containing
// Learning Objectives, Materials Needed, Lesson Procedure, Assessment, and Differentiation.

import express from "express";
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
app.use(express.static("public"));

async function callAPI(req, res) {
    const { topic } = req.body;

    const prompt = `Create a lesson plan for the topic "${topic}" with the following subheadings:
    - Learning Objectives
    - Materials Needed
    - Lesson Procedure
    - Assessment
    - Differentiation
    `;

    // const apiKey = process.env.CHATGPT_API_KEY;
    // console.log(apiKey);
    // const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${apiKey}`,
    //     },
    //     body: JSON.stringify({
    //         prompt: prompt,
    //         max_tokens: 500,
    //     }),
    // });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0,
            max_tokens: 1000,
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

app.post("/generateLessonPlan", callAPI);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

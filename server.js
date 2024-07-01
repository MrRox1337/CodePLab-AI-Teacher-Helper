// Server side connection with ChatGPT API to pull information for the teacher for the lesson plan.
// The user will input the course topic information and will receive a generated output containing
// Learning Objectives, Materials Needed, Lesson Procedure, Assessment, and Differentiation.

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/api/generateLessonPlan", async (req, res) => {
    const { topic } = req.body;

    const prompt = `
  Create a lesson plan for the topic "${topic}" with the following subheadings:
  - Learning Objectives
  - Materials Needed
  - Lesson Procedure
  - Assessment
  - Differentiation
  `;

    const apiKey = process.env.CHATGPT_API_KEY;
    const response = await fetch("https://api.openai.com/v1/engines/davinci-codex/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 1500,
        }),
    });

    const data = await response.json();
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

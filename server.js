// Server side connection with ChatGPT API to pull information for the teacher for the lesson plan.
// The user will input the course topic information and will receive a generated output containing
// Learning Objectives, Materials Needed, Lesson Procedure, Assessment, and Differentiation.

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
app.use(express.static("public"));

async function callAPI(request, response) {
    let topic = request.body;

    let prompt = `Create a lesson plan for the topic "${topic.body}" with the following subheadings: Learning Objectives, Materials Needed, Lesson Procedure, Assessment, Differentiation. The topics must strictly contain the above headings to standardize output.`;

    try {
        // const apiResponse = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "user", content: prompt }],
        //     temperature: 0,
        //     max_tokens: 500,
        // });
        let apiResponse = topic.body;
        console.log("server:", topic);
        response.status(200).json({ resp: apiResponse });
    } catch (err) {
        response.status(500).json(err.message);
    }
}

app.post("/generateLessonPlan", callAPI);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

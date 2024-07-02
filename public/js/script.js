// CodePLab AI Teacher Helper
// Technical Challenge
// Made by: Aman Mishra
//
// This code will send requests to the webservice backend and display the output on the frontend UI

document.getElementById("lessonForm").addEventListener("submit", generateLessonPlan);

async function generateLessonPlan(event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;

    const response = await fetch("/generateLessonPlan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: topic }),
    });

    const data = await response.json();
    document.getElementById("output").textContent = JSON.stringify(
        data.resp.choices[0].message.content
    );
}

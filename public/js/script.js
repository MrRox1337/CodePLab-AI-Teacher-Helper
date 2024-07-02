// CodePLab AI Teacher Helper
// Technical Challenge
// Made by: Aman Mishra
//
// This code will send requests to the webservice backend and display the output on the frontend UI

//------------ Setup Instructions --------------//
//
// Follow instructions in server.js
//
//------------ Code begins ---------------------//

// Attach listener to UI
document.getElementById("lessonForm").addEventListener("submit", generateLessonPlan);

// Function to call webservice and display the generated lesson plan on the UI
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

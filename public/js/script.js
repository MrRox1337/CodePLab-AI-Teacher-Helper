document.getElementById("lessonForm").addEventListener("submit", generateLessonPlan);

async function generateLessonPlan(event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;

    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: topic,
    };

    const response = await fetch("/generateLessonPlan", request);

    const data = await response.json();
    document.getElementById("output").textContent = data.choices[0].message.content;
}

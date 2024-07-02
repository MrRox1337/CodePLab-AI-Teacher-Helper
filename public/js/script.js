document.getElementById("lessonForm").addEventListener("submit", generateLessonPlan);

async function generateLessonPlan(event) {
    event.preventDefault();

    const topic = document.getElementById("topic").value;

    const response = await fetch("/generateLessonPlan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;",
        },
        body: JSON.stringify({ topic: topic }),
    });

    // const data = await response.json();
    // document.getElementById("output").textContent = data.choices[0].message.content;
    const data = await response.json();
    document.getElementById("output").textContent = data.resp;
}

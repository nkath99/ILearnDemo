console.log("App is running");
// Mock data
let assignments = ["Math Homework", "Science Project"];
let grades = { "John Doe": "A", "Jane Smith": "B", "Mark Johnson": "C" };
let submissions = ["Essay by Jane", "Project by John", "Homework by Mark"];

// Function to render assignments
function renderAssignments() {
    const assignmentList = document.getElementById("assignmentList");
    assignmentList.innerHTML = "";

    assignments.forEach((assignment, index) => {
        assignmentList.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${assignment}
                <button class="btn btn-danger btn-sm" onclick="removeAssignment(${index})">Remove</button>
            </li>
        `;
    });
}

// Function to add a new assignment
function addAssignment() {
    const input = document.getElementById("assignmentInput");
    const assignmentName = input.value.trim();

    if (assignmentName) {
        assignments.push(assignmentName);
        input.value = "";
        renderAssignments();
    } else {
        alert("Please enter an assignment name.");
    }
}

// Function to remove an assignment
function removeAssignment(index) {
    assignments.splice(index, 1);
    renderAssignments();
}

// Function to manage grades
function manageGrades() {
    const gradesList = document.getElementById("gradesList");
    gradesList.innerHTML = "";

    for (const [student, grade] of Object.entries(grades)) {
        gradesList.innerHTML += `
            <li class="list-group-item">
                ${student}: ${grade}
            </li>
        `;
    }
}

// Function to view student submissions
function viewSubmissions() {
    const submissionList = document.getElementById("submissionList");
    submissionList.innerHTML = "";

    submissions.forEach(submission => {
        submissionList.innerHTML += `
            <li class="list-group-item">${submission}</li>
        `;
    });
}

// Initial render of assignments
window.onload = renderAssignments;

console.log("App is running");

// Mock data
let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
let grades = { "John Doe": "A", "Jane Smith": "B", "Mark Johnson": "C" };
let submissions = ["Essay by Jane", "Project by John", "Homework by Mark"];
let users = ["Admin User", "Teacher User", "Student User"];
let reports = ["Report 1: System Analysis", "Report 2: User Activity", "Report 3: Performance Metrics"];

let redirectUrl = "";

// ===================== Toast Notification Functionality =====================
function showToast(message, type = "info") {
    const toastContainer = document.getElementById("toastContainer");
    if (toastContainer) {
        
        const toastEl = document.createElement("div");
        toastEl.className = "toast align-items-center text-bg-" + type + " border-0";
        toastEl.setAttribute("role", "alert");
        toastEl.setAttribute("aria-live", "assertive");
        toastEl.setAttribute("aria-atomic", "true");
        toastEl.innerHTML = `
          <div class="d-flex">
            <div class="toast-body">
              ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        `;
        toastContainer.appendChild(toastEl);

        // Show the toast notification
        const bsToast = new bootstrap.Toast(toastEl, { delay: 3000 });
        bsToast.show();
        
        // Remove toast from DOM when hidden
        toastEl.addEventListener("hidden.bs.toast", function () {
            toastEl.remove();
        });
    }
}
// ===================== Dark Mode Toggle =====================
    
document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", function() {
            document.body.classList.toggle("dark-mode");
        });
    }
});
// ===================== Username & Password Prompt (Login Page) =====================

// Function to show the login modal
function showLoginModal(url) {
    redirectUrl = url; // Set the intended redirection URL
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    loginModal.show();
}

// Function to process the login form submission
function processLogin(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username && password) {
        localStorage.setItem("isloggedIn", true);
        showToast(`Welcome, ${username}!`, "success");
        window.location.href = redirectUrl;
    } else {
        showToast("Please enter both username and password.", "danger");
    }
}

// ===================== Teacher Dashboard Functionality =====================

// Function to render assignments (Teacher Dashboard)
function renderAssignments() {
    const assignmentList = document.getElementById("assignmentList");
    if (assignmentList) {
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
}

// Function to add a new assignment (Teacher Dashboard)
function addAssignment() {
    const input = document.getElementById("assignmentInput");
    if (input) {
        const assignmentName = input.value.trim();
        if (assignmentName) {
            assignments.push(assignmentName);
            localStorage.setItem("assignments", JSON.stringify(assignments)); // Save to localStorage
            input.value = "";
            renderAssignments();
        } else {
            alert("Please enter an assignment name.");
        }
    }
}

// Function to remove an assignment (Teacher Dashboard)
function removeAssignment(index) {
    assignments.splice(index, 1);
    localStorage.setItem("assignments", JSON.stringify(assignments)); // Save to localStorage
    renderAssignments();
}

// Function to manage grades (Shared with Student Dashboard)
function manageGrades() {
    const gradesList = document.getElementById("gradesList") || document.getElementById("studentGradesList");
    if (gradesList) {
        gradesList.innerHTML = "";
        for (const [student, grade] of Object.entries(grades)) {
            gradesList.innerHTML += `
                <li class="list-group-item">
                    ${student}: ${grade}
                </li>
            `;
        }
    }
}

// Function to view student submissions (Teacher Dashboard)
function viewSubmissions() {
    const submissionList = document.getElementById("submissionList");
    if (submissionList) {
        submissionList.innerHTML = "";
        submissions.forEach(submission => {
            submissionList.innerHTML += `<li class="list-group-item">${submission}</li>`;
        });
    }
}

// ===================== Admin Dashboard Functionality =====================

// Function to add a new user (Admin Dashboard)
function addUser() {
    const userInput = document.getElementById("userInput");
    if (userInput) {
        const userName = userInput.value.trim();
        if (userName) {
            users.push(userName);
            userInput.value = "";
            renderUsers();
        } else {
            alert("Please enter a user name.");
        }
    }
}

// Function to render users (Admin Dashboard)
function renderUsers() {
    const userList = document.getElementById("userList");
    if (userList) {
        userList.innerHTML = "";
        users.forEach((user, index) => {
            userList.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${user}
                    <button class="btn btn-danger btn-sm" onclick="removeUser(${index})">Remove</button>
                </li>
            `;
        });
    }
}

// Function to remove a user (Admin Dashboard)
function removeUser(index) {
    users.splice(index, 1);
    renderUsers();
}

// Function to view reports (Admin Dashboard)
function viewReports() {
    const reportList = document.getElementById("reportList");
    if (reportList) {
        reportList.innerHTML = "";
        reports.forEach(report => {
            reportList.innerHTML += `<li class="list-group-item">${report}</li>`;
        });
    }
}

// ===================== Student Dashboard Functionality =====================

// Function to view assignments (Student Dashboard)
function viewAssignments() {
    const assignmentList = document.getElementById("studentAssignmentList");
    if (assignmentList) {
        assignmentList.innerHTML = "";
        assignments.forEach(assignment => {
            assignmentList.innerHTML += `<li class="list-group-item">${assignment}</li>`;
        });
    }
}

// Function to submit an assignment (Student Dashboard)
function submitAssignment() {
    const submissionInput = document.getElementById("submissionInput");
    if (submissionInput) {
        const assignmentName = submissionInput.value.trim();
        if (assignmentName) {
            submissions.push(assignmentName);
            submissionInput.value = "";
            alert("Assignment submitted successfully!");
        } else {
            alert("Please enter an assignment name.");
        }
    }
}

// ===================== Initial Page Load Handling =====================

// Function to initialize the appropriate dashboard
function initializePage() {
    if (document.getElementById("assignmentList")) renderAssignments(); // Teacher Dashboard
    if (document.getElementById("userList")) renderUsers(); // Admin Dashboard
    if (document.getElementById("reportList")) viewReports(); // Admin Dashboard
    if (document.getElementById("studentAssignmentList")) viewAssignments(); // Student Dashboard
}

// Initialize the appropriate dashboard when the page loads
window.onload = initializePage;

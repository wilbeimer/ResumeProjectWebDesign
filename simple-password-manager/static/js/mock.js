// ======= Mock Password Manager JS =======

// Dummy initial data to simulate stored passwords
let passwords = [
    { id: 1, site: "example.com", username: "user1", password: "abc123XYZ!" },
    { id: 2, site: "test.com", username: "user2", password: "Password!@#" }
];

// Track next ID for new entries
let nextId = passwords.length + 1;

// Helper: generate a random password
function generateRandomPassword(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let pwd = "";
    for (let i = 0; i < length; i++) {
        // Randomly select a character for each position
        pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
}

// Render the password table dynamically
function renderTable() {
    const tbody = document.getElementById("password-table-body");
    tbody.innerHTML = ""; // Clear existing rows to avoid duplication

    passwords.forEach(p => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${p.site}</td>
            <td>${p.username}</td>
            <td>
                <span class="hidden-password">••••••••</span>
                <button class="show-password" data-password="${p.password}">Show</button>
            </td>
            <td><button class="delete-btn" data-id="${p.id}">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });

    // Attach show/hide password handlers
    document.querySelectorAll(".show-password").forEach(btn => {
        btn.addEventListener("click", e => {
            e.preventDefault();
            const span = btn.previousElementSibling;
            if (span.textContent === "••••••••") {
                // Reveal password
                span.textContent = btn.dataset.password;
                btn.textContent = "Hide";
            } else {
                // Hide password
                span.textContent = "••••••••";
                btn.textContent = "Show";
            }
        });
    });

    // Attach delete handlers for each row
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", e => {
            const id = parseInt(btn.dataset.id);
            // Remove selected password and re-render table
            passwords = passwords.filter(p => p.id !== id);
            renderTable();
        });
    });
}

// Generate password button functionality
document.getElementById("generate-btn").addEventListener("click", () => {
    const length = parseInt(document.getElementById("length").value) || 20;
    const pwd = generateRandomPassword(length);
    document.getElementById("password-output").textContent = pwd;
});

// Add new password entry
document.getElementById("add-btn").addEventListener("click", () => {
    const site = document.getElementById("site").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!site || !username || !password) return; // Prevent empty entries

    passwords.push({ id: nextId++, site, username, password });

    // Clear input fields after adding
    document.getElementById("site").value = "";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    renderTable(); // Refresh table to include new entry
});

// Initial table render on page load
renderTable();


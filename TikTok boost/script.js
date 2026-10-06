const form = document.getElementById("signupForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const message = document.getElementById("formMessage");

document.querySelectorAll(".toggle").forEach(button => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);
    const hidden = input.type === "password";
    input.type = hidden ? "text" : "password";
    button.textContent = hidden ? "Hide" : "Show";
  });
});

password.addEventListener("input", () => {
  const value = password.value;
  let score = 0;
  if (value.length >= 8) score++;
  if (/[A-Z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;

  const widths = ["0%", "25%", "50%", "75%", "100%"];
  strengthBar.style.width = widths[score];

  const labels = [
    "Use 8+ characters with a number and symbol.",
    "Weak password.",
    "Fair password.",
    "Good password.",
    "Strong password."
  ];
  strengthText.textContent = labels[score];
});

form.addEventListener("submit", (event) => {
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const pass = password.value;
  const confirm = confirmPassword.value;
  const terms = document.getElementById("terms").checked;

  if (!fullName || !email || !pass || !confirm) {
    event.preventDefault();
    showMessage("Please complete all required fields.", true);
    return;
  }

  if (pass.length < 8) {
    event.preventDefault();
    showMessage("Password must contain at least 8 characters.", true);
    return;
  }

  if (pass !== confirm) {
    event.preventDefault();
    showMessage("Passwords do not match.", true);
    return;
  }

  if (!terms) {
    event.preventDefault();
    showMessage("Please agree to the Terms & Privacy Policy.", true);
    return;
  }

  // Password inputs intentionally have no "name" attribute,
  // so FormSubmit will not receive either password.
  showMessage("Sending your information...", false);
});

document.getElementById("loginLink").addEventListener("click", (event) => {
  event.preventDefault();
  showMessage("Login page can be connected here next.", false);
});

function showMessage(text, isError) {
  message.textContent = text;
  message.style.color = isError ? "#ff7aa8" : "#6ee7b7";
}

const form = document.querySelector("form");
const passwordInput = document.getElementById("password");
const passToggleBtn = document.getElementById("pass-toggle-btn");

const removeErrors = () => {
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());
}

const showError = (field, errorText) => {
    field.classList.add("error");
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

const validations = {
    "fullname": value => value === "" ? "Enter your full name" : "",
    "email": value => /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(value) ? "" : "Enter a valid email address",
    "password": value => value === "" ? "Enter your password" : "",
    "date": value => value === "" ? "Select your date of birth" : "",
    "gender": value => value === "" ? "Select your gender" : ""
};

const handleFormData = (e) => {
    e.preventDefault();
    
    removeErrors();

    let isFormValid = true;

    Object.keys(validations).forEach(key => {
        const input = document.getElementById(key);
        const errorText = validations[key](input.value.trim());
        if (errorText) {
            showError(input, errorText);
            isFormValid = false;
        }
    });

    if (isFormValid) {
        form.submit();
    }
}

passToggleBtn.addEventListener('click', () => {
    const isPassword = passwordInput.type === "password";
    passToggleBtn.className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = isPassword ? "text" : "password";
});

form.addEventListener("submit", handleFormData);
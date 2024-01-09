// Aquí tienes un esquema básico de la función de registro.
const register = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  if (formData.get("email") !== formData.get("confirm_email")) {
    alert("Emails do not match!");
    return;
  }

  if (formData.get("password") !== formData.get("confirm_password")) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
    age: formData.get("age"),
  };

  try {
    const response = await fetch("/api/sessions/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Registration successful!");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  } catch (error) {
    alert("There was a network error: " + error.message);
  }
};

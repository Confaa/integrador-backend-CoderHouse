const login = async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;

  if (!email || !password) {
    return alert("Please enter all fields");
  }

  const loginData = {
    email: email,
    password: password,
  };
  console.log(loginData);
  const response = await fetch("/api/sessions/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  if (response.ok) {
    document.location.replace("/products");
  } else {
    alert("Login failed!");
  }
};

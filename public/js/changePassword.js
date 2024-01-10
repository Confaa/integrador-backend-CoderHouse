const changePasswordRecovery = async (e) => {
  e.preventDefault();

  const password = e.target.password.value;
  const confirmPassword = e.target.confirmPassword.value;
  const token = e.target.token.value;

  if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
  } else if (e.target.password.value.length === 0) {
    alert("Password cannot be empty");
    return;
  }
  const response = await fetch(`/api/recovery/change-password?token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, confirmPassword }),
  });
  console.log(response);

  if (response.ok) {
    window.location.href = "/login?passwordChanged=true";
  } else {
    alert("Something went wrong");
  }
};

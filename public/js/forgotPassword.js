const sendEmailRecovery = async (e) => {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const email = e.target.email.value;

  if (emailRegex.test(email)) {
    const response = await fetch(`/api/recovery/send-email?email=${email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.href = "/login?forgotPassword=true";
    } else {
      alert("Email not sent");
    }
  } else {
    alert("Invalid email address");
  }
};

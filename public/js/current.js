const changeRole = async (e) => {
  try {
    const uid = e.target.getAttribute("data-user-id");
    const result = await fetch(`/api/users/premium/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    if (result.ok) {
      alert("Role changed successfully");
      window.location.reload();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
};

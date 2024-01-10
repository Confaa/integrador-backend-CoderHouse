const changeRoleAdmin = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/users/change-role", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      uid: e.target.getAttribute("data-user-id"),
      role: e.target.value,
    }),
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Error changing role");
  }
};

const deleteUserAdmin = async(e) => {
  e.preventDefault();
  const uid = e.target.getAttribute("data-user-id");
  const response =await fetch(`/api/users/${uid}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Error deleting user");
  }
};

const deleteInactiveUsers = async (e) => {
  e.preventDefault();
  const response = await fetch("/api/users", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert("Error deleting inactive users");
  }
}
const checkout = async (e) => {
  e.preventDefault();
  const response = await fetch(`/api/carts/${e.target.value}/purchase`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    let data = await response.json();
    window.location.href = `/tickets/${data.payload._id}`;
  }
};

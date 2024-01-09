const addToCart = async (e) => {
  e.preventDefault();
  const response = await fetch(
    `/api/carts/${e.target.getAttribute(
      "data-cart-id",
    )}/product/${e.target.getAttribute("data-product-id")}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: 1 }),
    },
  );
  if (response.status === 201) {
    alert("Product added to cart");
  } else {
    alert("Something went wrong");
  }
};

const logout = async () => {
  const response = await fetch("/api/sessions/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/login?logout=true");
  } else {
    alert("Logout failed!");
  }
};

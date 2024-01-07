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

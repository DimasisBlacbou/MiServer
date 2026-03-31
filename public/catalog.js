function addToCart(id) {
  fetch(`/cart?id=${id}`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => alert("продукт добавлен в карзину"));
}
function removeFromCart(id) {
  fetch(`/cart?id=${id}`, { method: "DELETE" })
    .then((response) => response.json())
    .then((data) => {
      alert("продукт удален из карзины");
      location.reload();
    });
}
function orderAcceptedFromCart() {
  fetch(`/order`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      alert("Заказ сделан");
      location.reload();
    });
}
function search(e) {
  const query = e.target.value.toLowerCase().trim();
  const productCards = document.querySelectorAll(".product-card");

  productCards.forEach((card) => {
    const productName = card.querySelector("h2").textContent.toLowerCase();
    const productDescription = card
      .querySelector(".short-desc")
      .textContent.toLowerCase();

    if (
      productName.includes(query) ||
      productDescription.includes(query) ||
      query === ""
    ) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

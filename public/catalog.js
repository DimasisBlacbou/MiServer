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

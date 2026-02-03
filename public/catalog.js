function addToCart(id) {
  fetch(`/cart?id=${id}`, { method: "POST" })
    .then((response) => response.json())
    .then((data) => alert("продукт добавлен в карзину"));
}

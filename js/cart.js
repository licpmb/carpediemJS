let cart = {};
let total = 0;

function addToCart(event) {
  const quantityInput = event.target.previousElementSibling;
  const quantity = parseInt(quantityInput.value);

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity.");
    return;
  }

  const name = event.target.dataset.name; // Nombre del producto
  const price = parseFloat(event.target.dataset.price); // Precio del producto
  const imageUrl = event.target.dataset.image; // URL de la imagen

  if (cart[name]) {
    cart[name].quantity += quantity;
  } else {
    cart[name] = { price, quantity, imageUrl };
  }

  total += price * quantity;
  updateCartCount();
  displayCart();

  // Notificación de producto agregado
  alert(`Se ha agregado ${quantity} de ${name} al carrito.`);
}

function removeFromCart(name) {
  total -= cart[name].price * cart[name].quantity;
  delete cart[name];
  updateCartCount();
  displayCart();
}

function displayCart() {
  const cartDiv = document.getElementById("cart");
  let content = "<ul style='list-style: none; padding: 0;'>"; // Estructura de lista sin bordes

  for (const name in cart) {
    const item = cart[name];
    content += `
      <li class="cart-item" style="display: flex; align-items: center; margin-bottom: 10px;">
        <img src="${item.imageUrl}" alt="${name}" style="width: 50px; height: 50px; margin-right: 10px;">
        ${name} - $${item.price} x ${item.quantity} 
        <button class="remove" onclick="removeFromCart('${name}')" style="margin-left: auto;">Eliminar</button>
      </li>`;
  }

  content += "</ul>";
  cartDiv.innerHTML = content;
  document.getElementById("total").innerText = `Total: $${total}`;
}

function updateCartCount() {
  const count = Object.keys(cart).length;
  document.getElementById("cart-count").innerText = count;
}

function showModalCart() {
  document.getElementById("cart-modal").style.display = "block";
  displayCart();
}

function closeModalCart() {
  document.getElementById("cart-modal").style.display = "none";
}

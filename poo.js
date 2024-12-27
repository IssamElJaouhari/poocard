  // Product Class
  class Product {
    constructor(id, name, price) {
      this.id = id;
      this.name = name;
      this.price = price;
    }
  }

  // ShoppingCartItem Class
  class ShoppingCartItem {
    constructor(product, quantity) {
      this.product = product;
      this.quantity = quantity;
    }

    getTotalPrice() {
      return this.product.price * this.quantity;
    }
  }

  // ShoppingCart Class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }

    addItem(product, quantity = 1) {
      const existingItem = this.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push(new ShoppingCartItem(product, quantity));
      }
      this.displayCart();
    }

    removeItem(productId) {
      this.items = this.items.filter(
        (item) => item.product.id !== productId
      );
      this.displayCart();
    }

    getTotalPrice() {
      return this.items.reduce(
        (total, item) => total + item.getTotalPrice(),
        0
      );
    }

    

    displayCart() {
      const cartItemsContainer = document.getElementById("cart-items");
      cartItemsContainer.innerHTML = "";
      this.items.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.className = "cart-item";
        cartItemDiv.innerHTML = `
        <p><strong>${item.product.name}</strong></p>
        <p>Price: $${item.product.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Total: $${item.getTotalPrice().toFixed(2)}</p>
        <button onclick="cart.removeItem(${
          item.product.id
        })">Remove</button>
      `;
        cartItemsContainer.appendChild(cartItemDiv);
      });

      document.getElementById("total-price").innerText =
        this.getTotalPrice().toFixed(2);
    }
  }

  // Initialize products and cart
  const products = [
    new Product(1, "eyeliner", 10.99),
    new Product(2, "lip glose", 20.49),
    new Product(3, "camera", 15.75),
    new Product(4, "meryem' laptop", 15.75),
  ];

  const cart = new ShoppingCart();

  // Display products
  const productsContainer = document.getElementById("products");
  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
    <p><strong>${product.name}</strong></p>
    <p>Price: $${product.price.toFixed(2)}</p>
    <button onclick="cart.addItem(products.find(p => p.id === ${
      product.id
    }))">Add to Cart</button>
  `;
    productsContainer.appendChild(productDiv);
  });
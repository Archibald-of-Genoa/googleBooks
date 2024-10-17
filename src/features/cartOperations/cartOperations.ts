import { Book } from "../../types";

export function getCart(): Book[] {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(book: Book): void {
  const cart = getCart();
  cart.push(book);
  updateCart(cart);
}

export function updateCart(cart: Book[]): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function isBookInCart(book: Book): boolean  {
    const cart = getCart();
    return cart.some((item) => item.id === book.id);
}

export function removeFromCart(book: Book): void {
    let cart = getCart();
    cart = cart.filter((item) => item.id !== book.id);
    updateCart(cart);
}

// Функция для обновления состояния кнопки
export function updateButtonState(button: HTMLElement, inCart: boolean): void {
    if (inCart) {
      button.textContent = "in the cart";
      button.classList.add("btn-secondary");
      button.classList.remove("btn-primary");
    } else {
      button.textContent = "Buy now";
      button.classList.add("btn-primary");
      button.classList.remove("btn-secondary");
    }
  }
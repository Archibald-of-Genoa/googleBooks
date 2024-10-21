import { Book } from "../../types";

export class Cart {
  private cart: Book[];

  constructor() {
    const cartJson = localStorage.getItem("cart");
    this.cart = cartJson ? (JSON.parse(cartJson) as Book[]) : [];
  }

  public toString() {
    return JSON.stringify(this.cart);
  }

  public addToCart(book: Book) {
    this.cart.push(book);
    this._sync();
  }

  public isBookInCart(book: Book) {
    return !!this.cart.find((item) => item.id === book.id);
  }
  public removeFromCart(book: Book) {
    this.cart = this.cart.filter((item) => item.id !== book.id);
    this._sync();
  }

  private _sync() {
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }
}

export function updateCartCount() {
  const cartCountElement = document.getElementById("booksCount");

  if (cartCountElement) {
    const cartJson = localStorage.getItem("cart");
    const cart = cartJson ? JSON.parse(cartJson) : [];
    const itemCount = cart.length;
    cartCountElement?.setAttribute("data-booksCount", itemCount > 0 ? String(itemCount) : "");

    // cartCountElement.textContent = itemCount > 0 ? String(itemCount) : "";
  }
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

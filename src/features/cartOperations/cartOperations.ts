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
// Переписал на класс потому что ты в этом месте каждый раз в цикле
// лезешь в loclStorage и парсишь json, эт пипец медленно
//
// export function isBookInCart(book: Book): boolean {
//   const cart = getCart();
//   return cart.some((item) => item.id === book.id);
// }

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

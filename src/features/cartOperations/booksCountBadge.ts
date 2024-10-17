import { getCart } from "./cartOperations";

export function booksCountBadge() {
  const count = getCart();
  const booksCount = document.getElementById("booksCount");
  booksCount?.setAttribute("data-booksCount", count.length.toString());
}

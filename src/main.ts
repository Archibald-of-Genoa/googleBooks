import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { searchBooks } from "./features/booksApi";

genresList.addEventListener("click", (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "LI") {
    const category = target.getAttribute("data-category");

    if (category) searchBooks(category);

    handleActiveLi(target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  new Slider();
});

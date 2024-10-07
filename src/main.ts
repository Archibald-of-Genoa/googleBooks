import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { searchBooks } from "./features/booksApi";


genresList.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "LI") {
    const category = target.getAttribute("data-category");

    if (category) {
      const cardsList = document.getElementById('cardsList');
      const data = await searchBooks(category);
      if (data) {
        for (const {image, title} of data) {
          const cardElement = document.createElement("div");
          cardElement.innerHTML = /*html*/ `
            <img src="${image}" alt="${title}">
            <h2>${title}</h2>
          `;
    
          if (cardsList) {
            cardsList.append(cardElement);
          }
        }
      }
    }

    handleActiveLi(target);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  new Slider();
});

import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { searchBooks } from "./features/booksApi";

genresList.addEventListener("click", async (event) => {
  const target = event.target as HTMLElement;
  if (target.tagName === "LI") {
    const category = target.getAttribute("data-category");

    if (category) {
      const cardsList = document.getElementById("cardsList");
      const data = await searchBooks(category);

      if (data && cardsList) {
        cardsList.innerHTML = "";

        for (const { ...obj } of data) {
          const html = String.raw;
          const cardElement = document.createElement("div");
          const ratingCount = obj.ratingsCount
            ? `
              <div class="">${obj.ratingsCount}</div>
              `
            : "";
          const authors = obj.authors ? obj.authors.join(", ") : "";
          cardElement.innerHTML = html`
            <div class="flex h-[300px] justify-between gap-y-9">
              <div class="flex w-1/2 items-center justify-center">
                <img src="${obj.image}" alt="${obj.title}" />
              </div>

              <div class="flex w-1/2 flex-col items-start justify-center py-12">
                ${authors
                  ? `
              <h3 class="font-sans text-[10px] text-text-gray">
                ${authors}
              </h3>
              `
                  : ""}

                <h2 class="text-base font-bold text-text-black">
                  ${obj.title}
                </h2>
                ${ratingCount}
                ${obj.description
                  ? `
              <div class="line-clamp-3">${obj.description}</div>
              `
                  : ""}

                <button>buy now</button>
              </div>
            </div>
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

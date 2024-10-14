import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { searchBooks } from "./features/booksApi";
import { initRatings } from "./features/rating";

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
            ? html`<div class="">${obj.ratingsCount} review</div>`
            : "";
          const authors = obj.authors
            ? html`<h3 class="font-sans text-[10px] text-text-gray">
                ${obj.authors.join(", ")}
              </h3>`
            : "";
          const description = obj.description
            ? html`<div
                class="line-clamp-3 pt-4 font-sans text-[10px] text-text-gray"
              >
                ${obj.description}
              </div>`
            : "";

          let ratingTemplate = "";
          if (obj.averageRating) {
            ratingTemplate = html` <div class="rating">
              <div class="rating__body">
                <div class="rating__active">
                  <div class="rating__items">
                    <input class="rating__item" type="radio" />
                    <input class="rating__item" type="radio" />
                    <input class="rating__item" type="radio" />
                    <input class="rating__item" type="radio" />
                    <input class="rating__item" type="radio" />
                  </div>
                </div>
              </div>
            </div>`;
          }

          let currencyTemplate;
          if (obj.retailPrice?.amount && obj.retailPrice.currencyCode) {
            currencyTemplate = obj.retailPrice
              ? html`<h2 class="text-base font-bold text-text-black">
                  ${obj.retailPrice.amount} ${obj.retailPrice.currencyCode}
                </h2>`
              : "";
          }

          const book = html`
            <div class="flex h-[300px] justify-between gap-y-9">
              <div class="flex w-1/2 items-center justify-center">
                <img src="${obj.image}" alt="${obj.title}" />
              </div>

              <div class="flex w-1/2 flex-col items-start justify-center py-12">
                ${authors}
                <h2 class="text-base font-bold text-text-black">
                  ${obj.title}
                </h2>
                ${ratingTemplate} ${ratingCount} ${description} ${currencyTemplate}
              </div>
            </div>
          `;
          cardElement.innerHTML = book;

          if (cardsList) {
            cardsList.append(cardElement);
          }

          if (obj.averageRating) {
            const ratingActiveElement =
              cardElement.querySelector<HTMLElement>(".rating__active");
            if (ratingActiveElement) {
              initRatings(obj.averageRating);
              const ratingActiveWidth = obj.averageRating / 0.05;
              ratingActiveElement.style.width = `${ratingActiveWidth}%`;
            }
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

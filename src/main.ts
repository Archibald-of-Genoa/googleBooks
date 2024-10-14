import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { createBookObject, searchBooks } from "./features/booksApi";
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

        for (const { ...item } of data) {
          const bookData = encodeURIComponent(JSON.stringify(item));

          const html = String.raw;
          const cardElement = document.createElement("div");
          const ratingCount = item.ratingsCount
            ? html`<div class="text-[10px]">${item.ratingsCount} review</div>`
            : "";
          const authors = item.authors
            ? html`<h3 class="font-sans text-[10px] text-text-gray">
                ${item.authors.join(", ")}
              </h3>`
            : "";
          const description = item.description
            ? html`<div
                class="line-clamp-3 pt-4 font-sans text-[10px] text-text-gray"
              >
                ${item.description}
              </div>`
            : "";

          let ratingTemplate = "";
          if (item.averageRating) {
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

          const currencyTemplate =
            item.retailPrice?.amount && item.retailPrice.currencyCode
              ? html`<h2 class="mt-4 text-xs font-bold text-text-black">
                  ${item.retailPrice.amount} ${item.retailPrice.currencyCode}
                </h2>`
              : "";

          const book = html`
            <div class="flex min-h-[300px] justify-between gap-y-9">
              <div class="flex w-1/2 items-center justify-center">
                <img src="${item.image}" alt="${item.title}" />
              </div>

              <div class="flex w-1/2 flex-col items-start justify-center py-12">
                ${authors}
                <h2 class="text-base font-bold text-text-black">
                  ${item.title}
                </h2>
                <div class="flex items-center justify-between gap-[6px]">
                  ${ratingTemplate} ${ratingCount}
                </div>
                ${description} ${currencyTemplate}
                <button class="btn-primary mt-4" data-book="${bookData}">
                  buy now
                </button>
              </div>
            </div>
          `;
          cardElement.innerHTML = book;

          if (cardsList) {
            cardsList.append(cardElement);
          }

          if (item.averageRating) {
            const ratingActiveElement =
              cardElement.querySelector<HTMLElement>(".rating__active");
            if (ratingActiveElement) {
              initRatings(item.averageRating);
              const ratingActiveWidth = item.averageRating / 0.05;
              ratingActiveElement.style.width = `${ratingActiveWidth}%`;
            }
          }
        }
      }
    }

    handleActiveLi(target);
  }
});

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("btn-primary")) {
    const bookData = target.getAttribute("data-book");

    if (bookData) {
      const bookObject = JSON.parse(decodeURIComponent(bookData));

      console.log(bookObject);
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  new Slider();
});

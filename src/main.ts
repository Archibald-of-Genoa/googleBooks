import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
import { searchBooks } from "./features/booksApi";
import { initRatings } from "./features/rating";
import {
  isBookInCart,
  removeFromCart,
  addToCart,
  updateButtonState,
  getCart,
} from "./features/cartOperations";
import { loadMoreButton } from "./features/genresList/loadMoreButton";
import { booksCountBadge } from "./features/cartOperations/booksCountBadge";

document.addEventListener("DOMContentLoaded", async () => {
  // Инициализация слайдера
  new Slider();

  // Подгружаем книги для категории "Architecture" при загрузке страницы
  await loadBooks("Architecture");

  // Инициализируем обработчики событий для категорий жанров
  initGenreListeners();

  loadMoreButton();
});

export async function loadBooks(category: string, startIndex = 0) {
  const cardsList = document.getElementById("cardsList");
  if (cardsList) {
    const data = await searchBooks(category, startIndex);

    if (data) {
      if (startIndex === 0) {
        cardsList.innerHTML = ""; // Очищаем список книг
      }

      data.forEach((item) => {
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
          ratingTemplate = html`<div class="rating">
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

        const book = html`<div
          class="flex min-h-[300px] justify-between gap-y-9"
        >
          <div class="flex w-1/2 items-center justify-center drop-shadow-xl">
            <img src="${item.image}" alt="${item.title}" />
          </div>

          <div class="flex w-1/2 flex-col items-start justify-center py-12">
            ${authors}
            <h2 class="text-base font-bold text-text-black">${item.title}</h2>
            <div class="flex items-center justify-between gap-[6px]">
              ${ratingTemplate} ${ratingCount}
            </div>
            ${description} ${currencyTemplate}
            <button class="btn-primary mt-4" data-book="${bookData}">
              buy now
            </button>
          </div>
        </div>`;

        cardElement.innerHTML = book;
        cardsList.append(cardElement);

        // Обработка клика по кнопке "buy now"
        const buyButton = cardElement.querySelector("button");
        if (buyButton) {
          buyButton.addEventListener("click", (event) => {
            event.stopPropagation(); // Остановим всплытие события

            const bookData = buyButton.getAttribute("data-book");
            if (bookData) {
              const bookObject = JSON.parse(decodeURIComponent(bookData));
              console.log(bookObject);

              const inCart = isBookInCart(bookObject); // Проверка, есть ли книга в корзине
              updateButtonState(buyButton, inCart); // Обновляем состояние кнопки

              if (inCart) {
                removeFromCart(bookObject);
                updateButtonState(buyButton, false);
                console.log("Удалено из корзины:", getCart());
                booksCountBadge();
              } else {
                addToCart(bookObject);
                updateButtonState(buyButton, true);
                console.log("Добавлено в корзину:", getCart());
                booksCountBadge();
              }
            }
          });
        }

        // Инициализация рейтинга
        if (item.averageRating) {
          const ratingActiveElement =
            cardElement.querySelector<HTMLElement>(".rating__active");
          if (ratingActiveElement) {
            initRatings(item.averageRating);
            const ratingActiveWidth = item.averageRating / 0.05;
            ratingActiveElement.style.width = `${ratingActiveWidth}%`;
          }
        }
      });
    }
  }
}

function initGenreListeners() {
  genresList.addEventListener("click", async (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === "LI") {
      const category = target.getAttribute("data-category");

      if (category) {
        await loadBooks(category); // Загрузка книг по выбранной категории
      }

      handleActiveLi(target); // Обновляем активный класс для выбранного жанра
    }
  });
}

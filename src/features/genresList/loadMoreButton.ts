import { loadBooks } from "../../main";

export function loadMoreButton() {
  const cardsList = document.getElementById("cardsList");
  const lazyBtn = document.getElementById("loadMoreButton");

  let currentIndex = 6;


  if (cardsList && lazyBtn) {

    lazyBtn.addEventListener("click", async () => {
        const category = document.querySelector(".active-category")?.getAttribute("data-category") || "Architecture";
        await loadBooks(category, currentIndex); // Загрузка следующих книг
        currentIndex += 6; // Увеличиваем startIndex на 6 после каждой загрузки
      });
  }
}

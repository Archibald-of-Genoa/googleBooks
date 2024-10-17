export const genresList = document.querySelector("ul") as HTMLUListElement;

export function handleActiveLi(target: HTMLElement): void {
  if (target.tagName === "LI") {
    const items = genresList.querySelectorAll("li");
    
    // Удаляем классы "active" и "active-category" у всех элементов
    items.forEach((li) => {
      li.classList.remove("active");
      li.classList.remove("active-category");
    });
    
    // Добавляем нужные классы к выбранному элементу
    target.classList.add("active");
    target.classList.add("active-category"); // Этот класс нужен для функции loadMoreButton
  }
}

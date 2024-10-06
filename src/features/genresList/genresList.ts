export const genresList = document.querySelector("ul") as HTMLUListElement;

export function handleActiveLi(target: HTMLElement): void {
  if (target.tagName === "LI") {
    const items = genresList.querySelectorAll("li");
    items.forEach((li) => li.classList.remove("active"));
    target.classList.add("active");
  }
}

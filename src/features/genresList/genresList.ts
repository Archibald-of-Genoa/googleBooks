export const genresList = document.querySelector("ul") as HTMLUListElement;

export function handleActiveLi(e: MouseEvent): void {
  const target = e.target as HTMLLIElement;
  if (target.tagName === "LI") {
    const items = genresList.querySelectorAll("li");
    items.forEach((li) => li.classList.remove("active"));
    target.classList.add("active");
  }
}

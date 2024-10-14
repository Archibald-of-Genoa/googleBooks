const ratings: NodeListOf<Element> = document.querySelectorAll(".rating");


export function initRatings(averageRating?: number): void {
  let ratingActive: HTMLElement;

  ratings.forEach((rating: Element) => {
    initRating(rating as HTMLElement);
  });

  function initRating(rating: HTMLElement): void {
    initRatingVars(rating);
    setRatingActiveWidth();
  }

  function initRatingVars(rating: HTMLElement): void {
    ratingActive = rating.querySelector<HTMLElement>(".rating__active")!;
  }

  function setRatingActiveWidth(): void {
    if (averageRating) {
      const ratingActiveWidth: number = averageRating / 0.05;
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}

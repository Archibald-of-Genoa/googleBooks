// Я решил не вставлять свой первый слайдер из проекта для ремонтной конторы,
// так как он совсем уж топорный, совсем не модульный и совсем уж привязан к
// проекту, для которого он написан. Да ещё и написан на чистом JS. Поэтому ниже
// представлен очень простой, но функциональный слайдер на TS. Здесь я
// придерживался тактики клонирования слайдов для создания эффекта бесконечной
// карусели. Также применил вместо пенсионерских методов appendChild и insertBefore
// модные и молодежные append и prepend

class Slider {
  private currentIndex: number = 1;
  private slides: HTMLDivElement;
  private slideElements: NodeListOf<HTMLElement>;
  private totalSlides: number;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;

  constructor() {
    this.slides = document.querySelector(".slides")!;
    this.slideElements = document.querySelectorAll(".slide")!;
    this.totalSlides = this.slideElements.length;

    this.prevButton = document.querySelector(".prev")!;
    this.nextButton = document.querySelector(".next")!;

    //Чтобы имитировать бесконечную карусель, добавляем клоны первого и
    //последнего изображений

    const firstClone = this.slideElements[0].cloneNode(true) as HTMLElement;
    const lastClone = this.slideElements[this.totalSlides - 1].cloneNode(true) as HTMLElement;

    this.slides.append(firstClone);
    this.slides.prepend(lastClone);

    this.nextButton.addEventListener("click", () => this.showNextSlide());
    this.prevButton.addEventListener("click", () => this.showPrevSlide());
    this.slides.addEventListener("transitionend", () => this.handleTransitionEnd());
  }

  private showNextSlide() {
    this.currentIndex++;
    this.updateSlider();
  }

  private showPrevSlide() {
    this.currentIndex--;
    this.updateSlider();
  }

  private updateSlider(transition: boolean = true) {
    if (transition) {
      this.slides.style.transition = "transform 0,5s ease-in-out";
    } else {
      this.slides.style.transition = "none";
    }

    const offset = -this.currentIndex * 100;
    this.slides.style.transform = `translateX(${offset}%)`;
  }

  private handleTransitionEnd() {
    if (this.currentIndex === this.totalSlides + 1) {
      this.slides.style.transition = "none";
      this.currentIndex = 1;
      this.slides.style.transform = `translateX(${-this.currentIndex * 100}%)`;
      setTimeout(() => {
        this.slides.style.transition = `transform 0.5s ease-in-out`;
      }, 20);
    } else if (this.currentIndex === 0) {
      this.slides.style.transition = "none";
      this.currentIndex = this.totalSlides;
      this.slides.style.transform = `translateX(${-this.currentIndex * 100}%)`;
      setTimeout(() => {
        this.slides.style.transition = `transform 0.5s ease-in-out`;
      }, 20);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => new Slider());


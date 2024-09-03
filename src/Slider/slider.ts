// Я решил не вставлять свой первый слайдер из проекта для ремонтной конторы,
// так как он совсем уж топорный, совсем не модульный и совсем уж привязан к
// проекту, для которого он написан. Да ещё и написан на чистом JS. Поэтому ниже
// представлен очень простой, но функциональный слайдер на TS. Здесь я
// придерживался тактики клонирования слайдов для создания эффекта бесконечной
// карусели. Также применил вместо пенсионерских методов appendChild и insertBefore
// модные и молодежные append и prepend



export class Slider {
  private currentIndex: number = 1; // Начинаем с первого реального слайда
  private slides: HTMLDivElement;
  private slideElements: NodeListOf<HTMLElement>;
  private totalSlides: number;
  private prevButton: HTMLButtonElement;
  private nextButton: HTMLButtonElement;
  private isTransitioning: boolean = false; // Флаг, чтобы отслеживать, происходит ли переход

  constructor() {
    this.slides = document.querySelector(".slides")!;
    this.slideElements = document.querySelectorAll(".slide")!;
    this.totalSlides = this.slideElements.length;

    this.prevButton = document.querySelector(".prev")!;
    this.nextButton = document.querySelector(".next")!;

    // Добавляем клоны первого и последнего слайдов для бесконечной карусели
    const firstClone = this.slideElements[0].cloneNode(true) as HTMLElement;
    const lastClone = this.slideElements[this.totalSlides - 1].cloneNode(true) as HTMLElement;

    this.slides.append(firstClone);  // Клон первого слайда в конец
    this.slides.prepend(lastClone);  // Клон последнего слайда в начало

    this.nextButton.addEventListener("click", () => this.moveSlider('next'));
    this.prevButton.addEventListener("click", () => this.moveSlider('prev'));

    // Добавляем событие 'transitionend' для корректировки позиции и снятия флага перехода
    this.slides.addEventListener('transitionend', () => this.isTransitioning = false);

    // Устанавливаем начальное смещение слайдов
    this.updateSlider(false);
  }

  private moveSlider(direction: "prev" | "next") {
    if (this.isTransitioning) return; // Если слайдер уже в движении, игнорируем последующие клики

    this.isTransitioning = true; // Устанавливаем флаг перехода

    if (direction === "prev") {
      this.currentIndex--;
    } else {
      this.currentIndex++;
    }

    // Проверка и корректировка позиции, если находимся на клонированном слайде
    if (this.currentIndex === this.totalSlides + 1) { // Если на клонированном первом слайде
      this.slides.style.transition = "none";
      this.currentIndex = 1; // Перемещаем на первый реальный слайд
      this.updateSlider(false);
    } else if (this.currentIndex === 0) { // Если на клонированном последнем слайде
      this.slides.style.transition = "none";
      this.currentIndex = this.totalSlides; // Перемещаем на последний реальный слайд
      this.updateSlider(false);
    } else {
      this.updateSlider();
    }
  }

  private updateSlider(transition: boolean = true) {
    if (transition) {
      this.slides.style.transition = "transform 0.5s ease-in-out";
    } else {
      this.slides.style.transition = "none";
    }

    const offset = -this.currentIndex * 100;
    this.slides.style.transform = `translateX(${offset}%)`;
  }

}




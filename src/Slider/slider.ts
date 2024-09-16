// Я решил не вставлять свой первый слайдер (курильщика) из проекта для ремонтной конторы,
// так как он совсем уж топорный, совсем не модульный и совсем уж привязан к
// проекту, для которого он написан. Да ещё и написан на чистом JS. Поэтому ниже
// представлен слайдер здорового человека на TS. Здесь я
// придерживался тактики клонирования слайдов для создания эффекта бесконечной
// карусели. Также применил вместо пенсионерских методов appendChild и insertBefore
// модные и молодежные append и prepend

export class Slider {
  currentIndex: number = 1;
  slideContainer: HTMLDivElement;
  slideElements: NodeListOf<HTMLElement>;
  totalSlides: number;
  interval?: NodeJS.Timeout;
  dot: HTMLButtonElement;
  dots: NodeListOf<HTMLButtonElement>;
  dotIndex: number = this.currentIndex - 1;
  transitionInterval: number = 500; // milliseconds
  displayDuration: number = 3000;

  constructor() {
    this.slideContainer = document.querySelector(".slides")!;
    this.slideElements = document.querySelectorAll(".slide")!;
    this.totalSlides = this.slideElements.length;

    this.dot = document.querySelector(".dot")!;
    this.dots = document.querySelectorAll(".dot")!;

    const firstClone = this.slideElements[0].cloneNode(true);
    const lastClone = this.slideElements[this.totalSlides - 1].cloneNode(
      true
    )

    // Добавляем клонированные слайды в начало и конец
    this.slideContainer.prepend(lastClone);
    this.slideContainer.append(firstClone);

    // Сразу устанавливаем translateX на первый реальный слайд
    this.slideContainer.style.transform = `translateX(-100%)`;

    this.startAutoSlide();

    this.dots.forEach((d) => {
      d.addEventListener("click", this._clickHandler.bind(this));
    });
  }

  private _clickHandler(evt: MouseEvent) {
    const target = evt.target as HTMLButtonElement;
    const dotPos = parseInt(target.dataset.pos!);
    this.goToSlide(dotPos);
  }

  // Метод для перехода к слайду по индексу
  goToSlide(index: number, withTransition: boolean = true) {
    this.currentIndex = index;

    withTransition
      ? (this.slideContainer.style.transition = `transform ${this.transitionInterval}ms ease`)
      : (this.slideContainer.style.transition = "none");

    this.slideContainer.style.transform = `translateX(-${index * 100}%)`;

    // Обновляем активные точки
    this.updateDotClasses();

    // Обрабатываем клоны (при необходимости)
    this.handleCloneEdges();

    // reset the autoSlide interval
    this.startAutoSlide();
  }

  // Обрабатываем границы (переход на клонированные слайды)
  handleCloneEdges() {
    if (this.currentIndex === this.totalSlides + 1) {
      this.currentIndex = 1;
      setTimeout(() => {
        // Отключаем transition, чтобы скрыть резкий переход
        this.slideContainer.style.transition = "none";
        this.slideContainer.style.transform = `translateX(-100%)`;
      }, this.transitionInterval);
    }
  }

  updateDotClasses() {
    this.dots.forEach((dot) => dot.classList.remove("active"));

    if (this.currentIndex > -1 && this.currentIndex <= this.totalSlides) {
      this.dots[this.currentIndex - 1].classList.add("active");
    } else if (this.currentIndex === this.totalSlides + 1) {
      this.dots[0].classList.add("active");
    }

    this.dotIndex = this.currentIndex - 1;
  }

  startAutoSlide() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.interval = setInterval(() => {
      this.goToSlide(this.currentIndex + 1);
    }, this.displayDuration);
  }
}

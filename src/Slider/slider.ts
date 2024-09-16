// Я решил не вставлять свой первый слайдер (курильщика) из проекта для ремонтной конторы,
// так как он совсем уж топорный, совсем не модульный и совсем уж привязан к
// проекту, для которого он написан. Да ещё и написан на чистом JS. Поэтому ниже
// представлен слайдер здорового человека на TS. Здесь я
// придерживался тактики клонирования слайдов для создания эффекта бесконечной
// карусели. Также применил вместо пенсионерских методов appendChild и insertBefore
// модные и молодежные append и prepend

type direction = "prev" | "next";

export class Slider {
  currentIndex: number = 1;
  slides: HTMLDivElement;
  slideElements: NodeListOf<HTMLElement>;
  totalSlides: number;
  interval!: number;
  dot: HTMLButtonElement;
  dots: NodeListOf<HTMLButtonElement>;
  dotIndex: number = this.currentIndex - 1;

  constructor() {
    this.slides = document.querySelector(".slides")!;
    this.slideElements = document.querySelectorAll(".slide")!;
    this.totalSlides = this.slideElements.length;

    this.dot = document.querySelector(".dot")!;
    this.dots = document.querySelectorAll(".dot")!;

    const firstClone = this.slideElements[0].cloneNode(true) as HTMLDivElement;
    const lastClone = this.slideElements[this.totalSlides - 1].cloneNode(true) as HTMLDivElement;

    // Добавляем клонированные слайды в начало и конец
    this.slides.prepend(lastClone);
    this.slides.append(firstClone);

    // Сразу устанавливаем translateX на первый реальный слайд
    this.slides.style.transform = `translateX(-100%)`;

    this.dotSwitcher();

    this.startAutoSlide("next");

    this.dots.forEach((d) => {
      d.addEventListener("click", (e) => {
        const target = e.target as HTMLButtonElement;
        const dotPos = parseInt(target.dataset.pos!);
        this.goToSlide(dotPos);
      });
    });
  }

  // Метод для перехода к слайду по индексу
  goToSlide(index: number, withTransition: boolean = true) {
    clearInterval(this.interval);
    this.currentIndex = index;

    withTransition
      ? (this.slides.style.transition = "transform 0.5s ease")
      : (this.slides.style.transition = "none");

    this.slides.style.transform = `translateX(-${index * 100}%)`;

    // Обновляем активные точки
    this.dotSwitcher();

    // Обрабатываем клоны (при необходимости)
    this.handleCloneEdges();

    this.startAutoSlide('next');
  }

  moveSlide(direction: direction) {
    this.updateIndex(direction);

    this.goToSlide(this.currentIndex);
  }

  // Обновление индекса в зависимости от направления
  updateIndex(direction: direction) {
    direction == "next" ? this.currentIndex++ : this.currentIndex--;
  }

  // Перемещаем слайд в нужное место
  setSlidePosition() {
    const offset = -this.currentIndex * 100;
    this.slides.style.transition = `transform 0.5s ease`;
    this.slides.style.transform = `translateX(${offset}%)`;
  }

  // Обрабатываем границы (переход на клонированные слайды)
  handleCloneEdges() {
    if (this.currentIndex === this.totalSlides + 1) {
      setTimeout(() => {
        // Отключаем transition, чтобы скрыть резкий переход
        this.slides.style.transition = "none";
        this.currentIndex = 1;
        this.slides.style.transform = `translateX(-100%)`;
      }, 500);
    } else if (this.currentIndex === 0) {
      setTimeout(() => {
        this.slides.style.transition = "none";
        this.currentIndex = this.totalSlides;
        this.slides.style.transform = `translateX(-${this.totalSlides * 100}%)`;
      }, 500);
    }
  }

  dotSwitcher() {
    this.dots.forEach((dot) => dot.classList.remove("active"));

    if (this.currentIndex > 0 && this.currentIndex <= this.totalSlides) {
      this.dots[this.currentIndex - 1].classList.add("active");
    } else if (this.currentIndex === 0) {
      this.dots[this.totalSlides - 1].classList.add("active");
    } else if (this.currentIndex === this.totalSlides + 1) {
      this.dots[0].classList.add("active");
    }

    this.dotIndex = this.currentIndex - 1;
  }

  startAutoSlide(direction: direction) {
    this.interval = setInterval(() => {
      this.moveSlide(direction);
    }, 3000);
  }
}

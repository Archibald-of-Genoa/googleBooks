// Я решил не вставлять свой первый слайдер из проекта для ремонтной конторы,
// так как он совсем уж топорный, совсем не модульный и совсем уж привязан к
// проекту, для которого он написан. Да ещё и написан на чистом JS. Поэтому ниже
// представлен очень простой, но функциональный слайдер на TS. Здесь я
// придерживался тактики клонирования слайдов для создания эффекта бесконечной
// карусели. Также применил вместо пенсионерских методов appendChild и insertBefore
// модные и молодежные append и prepend

export class Slider {
  currentIndex: number = 1;
  slider: HTMLDivElement;
  slides: NodeListOf<HTMLElement>;
  // totalSlides: number;

  constructor() {
    this.slider = document.querySelector('.slider')!;
    this.slides = document.querySelectorAll('.slide')!;
    this.showSlides(); 
  }

  showSlides() {
    console.log(this.slides);
  }
  

}

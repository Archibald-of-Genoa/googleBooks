import { Slider } from "./Slider";
import { handleActiveLi, genresList } from "./features/genresList";
genresList.addEventListener('click', handleActiveLi);



document.addEventListener('DOMContentLoaded', () => new Slider());

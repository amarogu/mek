export function addClasses(element: HTMLElement, classes: string[]) {
    classes.forEach(className => {
      element.classList.add(className);
    });
  }
  
export function removeClasses(element: HTMLElement, classes: string[]) {
  classes.forEach(className => {
    element.classList.remove(className);
  });
}

export function checkSwipe(touchStartedY: number, touchEndedY: number) {
  if (touchStartedY > touchEndedY) {
    return 'up';
  } else {
    return 'down';
  }
}

export function getElScrollPos(el: HTMLElement, of: 'top' | 'bottom') {
  if (of === 'top') {
    return el.getBoundingClientRect().top + window.scrollY;
  } else {
    return el.getBoundingClientRect().bottom + window.scrollY;
  }
}

export function easeOutBack(x: number): number {
  return x * x * x * x * x;
}

import Img1 from '../../public/img1_us.png';
import Img2 from '../../public/img2_us.png';
import Img3 from '../../public/img3_us.png';
import Img4 from '../../public/img4_us.png';
import Img5 from '../../public/img5_us.png';
import Img6 from '../../public/img6_us.png';
import Img7 from '../../public/img7_us.png';
import Img8 from '../../public/img8_us.png';
import Img9 from '../../public/img9_us.png';
import Img10 from '../../public/img10_us.png';
import Img11 from '../../public/img11_us.png';
import Img12 from '../../public/img12_us.png';
import Img13 from '../../public/img13_us.png';
import Img14 from '../../public/img14_us.png';
import Img15 from '../../public/img15_us.png';

export const usImgs = [Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13, Img14, Img15];
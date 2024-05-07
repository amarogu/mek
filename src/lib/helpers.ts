import { type User } from './Models/User';

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

export const parseHeroContent = (user?: User) => {
  if (user) {
      if (user.multipleGuests) {
          switch (user.gender) {
              case 'female':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindas ao', 'nosso web', 'site.'];
              case 'male':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindos ao', 'nosso web', 'site.'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindes ao', 'nosso web', 'site.'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vind@s ao', 'nosso web', 'site.'];
          }
      } else {
          switch (user.gender) {
              case 'female':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vinda ao', 'nosso web', 'site.'];
              case 'male':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vindo ao', 'nosso web', 'site.'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vinde ao', 'nosso web', 'site.'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vind@ ao', 'nosso web', 'site.'];
          }
      }
  } else {
      return ['Vamos nos', 'casar!', 'Sejam bem', 'vindos ao', 'nosso web', 'site.'];
  }
}

export const parseMdHeroContent = (user?: User) => {
  if (user) {
      if (user.multipleGuests) {
          switch (user.gender) {
              case 'female':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindas ao', 'nosso web site'];
              case 'male':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindos ao', 'nosso web site'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindes ao', 'nosso web site'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vind@s ao', 'nosso web site'];
          }
      } else {
          switch (user.gender) {
              case 'female':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vinda ao', 'nosso web site'];
              case 'male':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vindo ao', 'nosso web site'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vinde ao', 'nosso web site'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vind@ ao', 'nosso web site'];
          }
      }
  } else {
      return ['Vamos nos', 'casar!', 'Sejam', 'bem vindos ao', 'nosso web site.'];
  }
}
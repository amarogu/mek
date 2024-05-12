import { type User } from './Models/User';
import { type Group } from './Models/Group';

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

export const parseHeroContent = (item?: User | Group) => {
  if (item) {
      if ('users' in item) {
          switch (item.gender) {
              case 'male':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindos ao', 'nosso web', 'site.'];
              case 'female':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindas ao', 'nosso web', 'site.'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vindes ao', 'nosso web', 'site.'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Sejam bem', 'vind@s ao', 'nosso web', 'site.'];
          }
      } else {
          switch (item.gender) {
              case 'male':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vindo ao', 'nosso web', 'site.'];
              case 'female':
                  return ['Vamos nos', 'casar!', 'Seja bem', 'vinda ao', 'nosso web', 'site.'];
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

export const parseMdHeroContent = (item?: User | Group) => {
  if (item) {
      if ('users' in item) {
          switch (item.gender) {
              case 'male':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindos ao', 'nosso web site'];
              case 'female':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindas ao', 'nosso web site'];
              case 'non-binary':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vindes ao', 'nosso web site'];
              case 'gender-fluid':
                  return ['Vamos nos', 'casar!', 'Sejam', 'bem vind@s ao', 'nosso web site'];
          }
      } else {
          switch (item.gender) {
              case 'male':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vindo ao', 'nosso web site'];
              case 'female':
                  return ['Vamos nos', 'casar!', 'Seja', 'bem vinda ao', 'nosso web site'];
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

export const parseGender = (gender: 'male' | 'female' | 'non-binary' | 'gender-fluid') => {
  switch (gender) {
    case 'male':
      return 'Masculino';
    case 'female':
      return 'Feminino';
    case 'non-binary':
      return 'Não-binário';
    case 'gender-fluid':
      return 'Gênero-fluído';
  }
}

export const getGender = (genders: ('male' | 'female' | 'non-binary' | 'gender-fluid')[]) => {
  const priorityOrder: ('male' | 'female' | 'non-binary' | 'gender-fluid')[] = ['male', 'female', 'non-binary', 'gender-fluid'];

  for (let priority of priorityOrder) {
    if (genders.includes(priority)) {
      return priority;
    }
  }

  return 'gender-fluid'; // default value if no gender is found
}

export const preventInteraction = (prevent: boolean) => {
  if (prevent) {
    document.body.style.pointerEvents = 'none';
  } else {
    document.body.style.pointerEvents = '';
  }
}
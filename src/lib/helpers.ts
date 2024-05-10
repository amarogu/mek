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
  let genderCount: { [key: string]: number } = {};

  // Count the occurrences of each gender
  for (let gender of genders) {
    if (gender in genderCount) {
      genderCount[gender]++;
    } else {
      genderCount[gender] = 1;
    }
  }

  // Find the gender with the maximum count
  let maxCount = 0;
  let maxGender: 'male' | 'female' | 'non-binary' | 'gender-fluid' = 'male';
  for (let gender in genderCount) {
    if (genderCount[gender] > maxCount) {
      maxCount = genderCount[gender];
      maxGender = gender as 'male' | 'female' | 'non-binary' | 'gender-fluid';
    }
  }

  return maxGender;
}
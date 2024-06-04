import { IGroup, IUser, IGift, IMsg } from './Models/Interfaces';

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

export const parseHeroContent = (item?: LeanDocument<IUser> | LeanDocument<IGroup>) => {
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

export const parseMdHeroContent = (item?: LeanDocument<IUser> | LeanDocument<IGroup>) => {
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

export const parseNavItem = (item: 'galeria' | 'recados' | 'presentes' | 'confirmar' | 'festa') => {
  switch (item) {
    case 'galeria': return '#us';
    case 'recados': return '#messages';
    case 'presentes': return '#gifts';
    case 'confirmar': return '#confirm';
    case 'festa': return '#party';
  }
}

export type ErrorResponse = {
  message: string;
  error: {
    errors: {
      content: {
        name: string;
        message: string;
        properties: {
          message: string;
          type: string;
          path: string;
          value: string;
        };
        kind: string;
        path: string;
        value: string;
      };
    };
    _message: string;
    name: string;
    message: string;
  };
}

export const emptyMsg: ErrorResponse = {
  message: 'An error occurred',
  error: {
    errors: {
      content: {
        name: 'ValidatorError',
        message: 'Path `content` is required.',
        properties: {
          message: 'Path `content` is required.',
          type: 'required',
          path: 'content',
          value: ''
        },
        kind: 'required',
        path: 'content',
        value: ''
      }
    },
    _message: 'Msg validation failed',
    name: 'ValidationError',
    message: 'Msg validation failed: content: Path `content` is required.'
  }
}

export type SuccessResponse = {
  message: string;
  msg?: {
    owner: string;
    content: string;
    _id: string;
    __v: number;
  };
}

export class AuthRes {
  status?: number;
  message: string;

  constructor(message: string, status?: number) {
      if (status) {
          this.status = status;
      }
      this.message = message;
  }
}

export const parseResponse = (res?: ErrorResponse | SuccessResponse) => {
  return {
    for: (i: string) => {
      if (!res) {
        return 'Falha';
      }
      switch (i) {
        case 'btn':
          if ('error' in res) {
            return 'Falha';
          }
          return 'Enviado';
        case 'input':
          if ('error' in res) {
            return 'Por favor, insira um recado para que você possa efetuar o envio.';
          }
          return '';
      }
    }
  }
}

export const animationTimeouts = {
  btn: {
    requestless: 3000,
    requested: 3550
  }
}

export const parseMessage = (message: string) => {
  switch (message) {
    case 'Payment succeeded!':
      return 'Pagamento aprovado';
    case 'Your payment is processing.':
      return 'Processando';
    default:
      'Falha no pagamento';
  }
}

export const renderPaymentResultDescription = (message: string) => {
  switch (message) {
    case 'Payment succeeded!':
      return 'Os noivos receberão a notificação do seu presente em breve.';
    case 'Your payment is processing.':
      return 'Seu pagamento está sendo processado.';
    default:
      return 'Algo deu errado. Por favor, tente novamente.';
  }
}

export type PlainAdminData = (Omit<IUser | IGroup, "msgs" | "giftsGiven"> & { msgs: IMsg[]; giftsGiven: IGift[]; } & { _id: string; } & Required<{ _id: string; }>)[];

export type LeanDocument<T> = (T & {_id: string} & Required<{_id: string}>);

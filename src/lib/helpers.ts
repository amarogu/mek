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
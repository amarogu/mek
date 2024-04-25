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
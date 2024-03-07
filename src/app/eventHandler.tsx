import React from 'react';

function isDocument(ref: React.MutableRefObject<any> | Document): ref is Document {
    return (ref as Document).createElement !== undefined;
}

export function eventHandler(ref: React.MutableRefObject<any> | Document, events: string[], callbacks: ((e: any) => void)[]) {
    const mediaQueryList = window.matchMedia('(pointer: coarse)');
    let touchDevice = mediaQueryList.matches;

    const listener = (event: MediaQueryListEvent) => {
        touchDevice = event.matches;
        const target = isDocument(ref) ? ref : ref.current;
        events.forEach((event, i) => {
            if (!touchDevice) {
                target.addEventListener(event, callbacks[i]);
            } else {
                target.removeEventListener(event, callbacks[i]);
            }
        });
    };

    mediaQueryList.addEventListener('change', listener);

    const target = isDocument(ref) ? ref : ref.current;
    events.forEach((event, i) => {
        if (!touchDevice) {
            target.addEventListener(event, callbacks[i]);
        }
    });
}

export function eventCleanUp(ref: React.MutableRefObject<any> | Document, events: string[], callbacks: ((e: any) => void)[]) {
    const mediaQueryList = window.matchMedia('(pointer: coarse)');
    mediaQueryList.removeEventListener('change', () => {});
    const target = isDocument(ref) ? ref : ref.current;
    events.forEach((event, i) => {
        if (target) {
            target.removeEventListener(event, callbacks[i]);
        }
    });
}
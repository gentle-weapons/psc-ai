//custom hook that uses intersection observer to fade elements in when you scroll to them
//also fades them out when you scroll away so it works both directions
'use client';

import { useEffect, useRef } from 'react';

export default function useScrollFade(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    //find all elements that have the fade-element class inside the ref
    const elements = node.querySelectorAll('.fade-element');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            //remove visible so it fades again when scrolling back
            entry.target.classList.remove('visible');
          }
        });
      },
      {
        threshold: options.threshold || 0.15,
        rootMargin: options.rootMargin || '0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [options.threshold, options.rootMargin]);

  return ref;
}

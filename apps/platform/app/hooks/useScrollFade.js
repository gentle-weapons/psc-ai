'use client';

import { useEffect, useRef } from 'react';

export default function useScrollFade(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // find all elements that have the fade-element class inside the ref
    const elements = node.querySelectorAll('.fade-element');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // stop observing once it has faded in so it only happens once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options.threshold || 0.05,
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

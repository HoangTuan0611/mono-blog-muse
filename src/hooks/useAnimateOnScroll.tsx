
import { useEffect, useRef } from "react";

export function useAnimateOnScroll() {
  const animatedElementsRef = useRef<NodeListOf<Element> | null>(null);
  
  useEffect(() => {
    // Get all elements with the animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    animatedElementsRef.current = elements;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add a small delay based on the index for a sequential animation
          setTimeout(() => {
            entry.target.classList.add('is-visible');
            // Once we've added the is-visible class, we don't need to observe anymore
            observer.unobserve(entry.target);
          }, index * 100);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    elements.forEach(el => observer.observe(el));
    
    return () => {
      if (animatedElementsRef.current) {
        animatedElementsRef.current.forEach(el => {
          observer.unobserve(el);
        });
      }
    };
  }, []);

  return animatedElementsRef;
}

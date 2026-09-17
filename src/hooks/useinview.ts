import { useEffect, useRef, useState } from 'react';

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement>(null);
  // Start visible — text is always readable; animations are progressive enhancement.
  // This prevents opacity:0 elements from staying hidden if IntersectionObserver
  // fires late, is unsupported, or Tailwind purges the arbitrary delay classes.
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset to hidden so the scroll-in animation can play for off-screen sections.
    setInView(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

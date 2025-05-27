import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback: () => void) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    });
    if (lastElementRef.current) {
      observer.current.observe(lastElementRef.current);
    }
    return () => observer.current?.disconnect();
  }, [callback]);

  return lastElementRef;
}; 
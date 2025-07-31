// Performance optimization utilities

// React.memo HOC with custom comparison function
export function withMemo<P extends object>(Component: React.ComponentType<P>, areEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean) {
  return React.memo(Component, areEqual);
}

// Lazy loading utility for components
export function lazyWithPreload<T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>) {
  const Component = React.lazy(factory);
  (Component as any).preload = factory;
  return Component;
}

// Intersection Observer hook for lazy loading components
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, options]);

  return isIntersecting;
}

// Cache results of expensive calculations
export function createResourceCache<T>(maxSize = 100) {
  const cache = new Map<string, { data: T; timestamp: number }>();

  return {
    get: (key: string): T | undefined => {
      const item = cache.get(key);
      return item?.data;
    },
    set: (key: string, data: T): void => {
      // Evict oldest items if cache is full
      if (cache.size >= maxSize) {
        const oldestKey = [...cache.entries()]
          .sort((a, b) => a[1].timestamp - b[1].timestamp)
          .shift()?.[0];
        if (oldestKey) cache.delete(oldestKey);
      }
      cache.set(key, { data, timestamp: Date.now() });
    },
    has: (key: string): boolean => cache.has(key),
    clear: (): void => cache.clear(),
  };
}

// Batch state updates to reduce renders
export function useBatchedState<T>(initialState: T): [T, (updates: Partial<T>) => void] {
  const [state, setState] = React.useState<T>(initialState);
  const batchedUpdates = React.useRef<Partial<T>>({});
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const batchedSetState = React.useCallback((updates: Partial<T>) => {
    batchedUpdates.current = { ...batchedUpdates.current, ...updates };

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setState((prevState) => ({ ...prevState, ...batchedUpdates.current }));
      batchedUpdates.current = {};
      timeoutRef.current = null;
    }, 0);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [state, batchedSetState];
}

// Optimize event handlers with stable references
export function useEventCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = React.useRef(callback);
  
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  return React.useCallback(
    ((...args) => callbackRef.current(...args)) as T,
    []
  );
}

// Import React at the top
import React from 'react';
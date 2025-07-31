// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Memoization utility
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map()
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Virtual scrolling utility for large lists
export function useVirtualScrolling(items: any[], itemHeight: number, containerHeight: number) {
  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const totalHeight = items.length * itemHeight

  return {
    visibleCount,
    totalHeight,
    getVisibleItems: (scrollTop: number) => {
      const startIndex = Math.floor(scrollTop / itemHeight)
      const endIndex = Math.min(startIndex + visibleCount, items.length)
      return {
        startIndex,
        endIndex,
        items: items.slice(startIndex, endIndex),
      }
    },
  }
}

// Image lazy loading utility
export function lazyLoadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(src)
    img.onerror = reject
    img.src = src
  })
}

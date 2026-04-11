'use client';

import { useEffect } from 'react';

export function ConsoleFilter() {
  useEffect(() => {
    // Suppress circular JSON errors from the environment's logging system
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (args[0] && typeof args[0] === 'string' && args[0].includes('Converting circular structure to JSON')) {
        return;
      }
      originalError.apply(console, args);
    };
    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}

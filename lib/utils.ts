import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const noOfWords = content.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.ceil(minutes);
}

export function formatDate(date: any, formatStr: string = 'MMM d, yyyy'): string {
  if (!date) return 'Unknown Date';
  
  // Handle Firestore Timestamp
  if (date && typeof date.toDate === 'function') {
    return format(date.toDate(), formatStr);
  }
  
  // Handle ISO string or Date object
  try {
    const d = typeof date === 'string' ? parseISO(date) : date;
    return format(d, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}

// src/shared/utils/cn.ts

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with conflict resolution
 * 
 * This utility combines clsx (for conditional classes) and tailwind-merge
 * (for resolving Tailwind class conflicts).
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-blue-500', 'px-6')
 * // Result: 'py-2 bg-blue-500 px-6' (px-4 is overridden by px-6)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
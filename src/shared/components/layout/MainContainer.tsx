// src/shared/components/layout/MainContainer.tsx

import { cn } from '@/shared/utils/cn';
import type { ReactNode } from 'react';

interface MainContainerProps {
  children: ReactNode;
  className?: string;
}

export function MainContainer({ children, className }: MainContainerProps) {
  return (
    <main className={cn('min-h-screen bg-slate-50 py-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}

// Section wrapper with optional title
interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ 
  title, 
  description, 
  children, 
  className 
}: SectionProps) {
  return (
    <section className={cn('space-y-6', className)}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <h2 className="section-header">{title}</h2>
          )}
          {description && (
            <p className="text-slate-600">{description}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
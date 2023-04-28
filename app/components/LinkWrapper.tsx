import Link from 'next/link';
import { ReactNode } from 'react';

export default function LinkWrapper ({ href, disabled, children, label, className}: { href: string, disabled?: boolean, children: ReactNode | string, label?: string, className?: string }) {
    if (disabled) {
      return( <button
        aria-label={label} 
        disabled 
        className={className}
        >{ children }</button>);
    }
    return (
      <Link 
      aria-label={label}
      href={href}
      className={className}
      >
        { children }
      </Link>
    );
  };
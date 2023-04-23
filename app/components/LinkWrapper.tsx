import Link from 'next/link';
import { ReactNode } from 'react';

export default function LinkWrapper ({ href, disabled, children, label}: { href: string, disabled?: boolean, children: ReactNode | string, label?: string }) {
    if (disabled) {
      return <button
        aria-label={label} 
        disabled >{ children }</button>;
    }
    return (
      <Link 
      aria-label={label}
      href={href}>
        <button>{ children }</button>
      </Link>
    );
  };
import Link from 'next/link';
import { ReactNode } from 'react';

export default function LinkWrapper ({ href, disabled, children }: { href: string, disabled?: boolean, children: ReactNode | string }) {
    if (disabled) {
      return <button disabled >{ children }</button>;
    }
    return (
      <Link href={href}>
        <button>{ children }</button>
      </Link>
    );
  };
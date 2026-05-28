'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function NavItem({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'w-full rounded-md px-3 py-2 text-sm font-medium transition-colors block',
        {
          'bg-secondary text-foreground font-semibold': isActive,
          'text-muted-foreground hover:bg-muted/60 hover:text-foreground': !isActive
        }
      )}
    >
      {label}
    </Link>
  );
}
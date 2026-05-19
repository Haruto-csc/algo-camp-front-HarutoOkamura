// サイドバーのボタンデザイン設定


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
  // 現在のページ（href）とブラウザのURL（pathname）が一致しているか判定
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        // 全体のベーススタイル（横いっぱいに広げ、内側に程よい余白を作る）
        'w-full rounded-md px-3 py-2 text-sm font-medium transition-colors block',
        {
          // アクティブ（現在地）のスタイル：背景を少し濃くし、文字をはっきりと
          'bg-secondary text-foreground font-semibold': isActive,
          // 非アクティブのスタイル：文字を少し薄くし、ホバー時に背景と色を変える
          'text-muted-foreground hover:bg-muted/60 hover:text-foreground': !isActive
        }
      )}
    >
      {label}
    </Link>
  );
}
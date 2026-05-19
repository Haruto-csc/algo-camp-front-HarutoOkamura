// コンテストテーブルの行設定


'use client';

import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';
import { deleteProduct } from './actions'; 

// Supabaseのデータ構造の定義
interface Contest {
  id: number;
  contest_name: string;
  start_time: string | Date;
  end_time: string | Date;
  is_active: boolean;
}

export function Product({ product, title }: { product: Contest, title: 'schedule' | 'inProgress' | 'end' }) {
  // 日時を「2026/05/19 15:00」のような形式に変換する関数
  const formatDateTime = (dateTimeStr: string | Date) => {
    if (!dateTimeStr) return '-';
    const date = new Date(dateTimeStr);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <TableRow>
      {/* 【2列目：コンテスト名】 
          親の「コンテスト名」に対応 */}
      <TableCell className="font-medium">{product.contest_name}</TableCell>

      {/* 【3列目：開催日時】 
          親の「開催日時」に対応 */}
      <TableCell>{formatDateTime(product.start_time)}</TableCell>

      {/* 【4列目：終了日時】 
          親の「終了日時」に対応 */}
      <TableCell>{formatDateTime(product.end_time)}</TableCell>

      {/* 【5列目：アクション】 
          親の「アクション」に対応（現在は中身は空ですが、列の数を合わせるために必須です） */}
      <TableCell className={title === 'schedule' ? '' : 'invisible'}>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          onClick={() => {
            // ここに編集画面を開く処理（モーダルを開く、またはページ遷移など）を書きます
            console.log(`${product.id} の編集ボタンが押されました`);
          }}
        >
          編集
        </Button>
      </TableCell>

      {/* 【6列目：削除（ゴミ箱）】 
          親の「Delet（削除）」に対応 */}
      <TableCell className={title === 'schedule' ? 'text-right' : 'invisible'}>
        <form action={deleteProduct}>
          <input type="hidden" name="id" value={product.id} />
          <Button
            size="icon"
            variant="ghost"
            type="submit"
            className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">削除</span>
          </Button>
        </form>
      </TableCell>
    </TableRow>
  );
}
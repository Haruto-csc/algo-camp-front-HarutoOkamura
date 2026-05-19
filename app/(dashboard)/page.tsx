// // Admin_コンテスト管理画面


'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';

export default function ProductsPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // もうしこし理解が必要
  useEffect(() => {
    fetch('http://localhost:8000/api/test')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setContests(data.data); // 取ってきた配列を保存
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('FastAPIからのデータ取得に失敗:', err);
        setLoading(false);
      });
  }, []);

  // 読み込み中の画面表示
  if (loading) {
    return (null);
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              コンテストを追加
            </span>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        {/* 以前設定した gap-10 の隙間を維持 */}
        <div className="flex flex-col gap-10">
          {/* 4. getProducts の代わりに、FastAPIから取ってきた本物のデータ（contests）を流し込む！ */}
          <ProductsTable
            products={contests}
            offset={contests.length}
            totalProducts={contests.length}
            title="schedule"
          />
          <ProductsTable
            products={contests}
            offset={contests.length}
            totalProducts={contests.length}
            title="inProgress"
          />
          <ProductsTable
            products={contests}
            offset={contests.length}
            totalProducts={contests.length}
            title="end"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
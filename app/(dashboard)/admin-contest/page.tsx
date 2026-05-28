// // Admin_問題管理画面
// import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductsTable } from './products-table';
import Link from "next/link";

export default async function Page() {
  const data_0 = await fetch('http://127.0.0.1:8000/contests/0', { cache: 'no-store' })
  const contests_0 = await data_0.json();
  const data_1 = await fetch('http://127.0.0.1:8000/contests/1', { cache: 'no-store' })
  const contests_1 = await data_1.json();
  const data_2 = await fetch('http://127.0.0.1:8000/contests/2', { cache: 'no-store' })
  const contests_2 = await data_2.json();
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
      コンテスト管理
    </h1>
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="h-8 gap-1">
            <Link href='/create-contest'>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                コンテストを追加
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <div className="flex flex-col gap-10">
          <ProductsTable
            products={contests_0}
            offset={contests_0.length}
            totalProducts={contests_0.length}
            title="schedule"
          />
          <ProductsTable
            products={contests_1}
            offset={contests_1.length}
            totalProducts={contests_1.length}
            title="inProgress"
          />
          <ProductsTable
            products={contests_2}
            offset={contests_2.length}
            totalProducts={contests_2.length}
            title="end"
          />
        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
}

// 問題テーブル


'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

// question.tsxを作成し、それと紐づける
// import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductsTable({
  products,
  offset,
  totalProducts,
}: {
  products: any[];
  offset: number;
  totalProducts: number;
}) {
  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>ここにコンテスト名入れたい</CardTitle>
      </CardHeader> */}
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>問題名</TableHead>
              <TableHead>実行時間制限</TableHead>
              <TableHead>メモリ制限</TableHead>
              <TableHead>アクション</TableHead>
              <TableHead>
                <span className="sr-only">Delet</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {products.map((product) => (
              <Product key={product.id} product={product} title={title}/>
            ))}
          </TableBody> */}
        </Table>
      </CardContent>
    </Card>
  );
}

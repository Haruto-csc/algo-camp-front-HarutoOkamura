// コンテストテーブル


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
import { Product } from './product';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ProductsTable({
  products,
  offset,
  totalProducts,
  title
}: {
  products: any[];
  offset: number;
  totalProducts: number;
  title: 'schedule' | 'inProgress' | 'end';
}) {
  let router = useRouter();
  let productsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  const titleMap = {
    schedule: '予定されているコンテスト',
    inProgress: '実施中のコンテスト',
    end: '終了したコンテスト'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titleMap[title]}</CardTitle>
        {/* <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className={title === 'schedule' ? '' : 'invisible'}>コンテスト名</TableHead>
              <TableHead>開催日時</TableHead>
              <TableHead>終了日時</TableHead>
              <TableHead className={title === 'schedule' ? '' : 'invisible'}>アクション</TableHead>
              <TableHead>
                <span className="sr-only">Delet</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <Product key={product.id} product={product} title={title}/>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {/* 次のページボタンやコンテンスト数を表示するやつ */}
      {/* <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - productsPerPage, totalProducts) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalProducts}</strong> products
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === productsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + productsPerPage > totalProducts}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter> */}
    </Card>
  );
}

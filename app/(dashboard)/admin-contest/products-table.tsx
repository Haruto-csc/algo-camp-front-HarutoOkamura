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
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Product } from './product';

export function ProductsTable({
    products,
    title
}: {
    products: any[];
    offset: number;
    totalProducts: number;
    title: 'schedule' | 'inProgress' | 'end';
}) {
    const titleMap = {
        schedule: '予定されているコンテスト',
        inProgress: '実施中のコンテスト',
        end: '終了したコンテスト'
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>{titleMap[title]}</CardTitle>
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
                                <span className="sr-only">削除</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <Product key={product.id} product={product} title={title} />
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

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

import { Problem } from './problem';
import { useRouter } from 'next/navigation';

export function ProblemsTable({
  problems,
  offset,
}: {
  problems: any[];
  offset: number;
  totalProblems: number;
}) {
  let router = useRouter();

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
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
          <TableBody>
            {problems.map((problem) => (
              <Problem key={problem.id} problem={problem}/>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

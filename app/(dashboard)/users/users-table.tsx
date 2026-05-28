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

import { User } from './user';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UsersTable({
  users,
  offset,
  totalUsers,
}: {
  users: any[];
  offset: number;
  totalUsers: number;
}) {
  let router = useRouter();
  let usersPerPage = 5;

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
              <TableHead>ユーザ名</TableHead>
              <TableHead>ログインID</TableHead>
              <TableHead>アクション</TableHead>
              <TableHead>
                <span className="sr-only">Delet</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <User key={user.id} user={user}/>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

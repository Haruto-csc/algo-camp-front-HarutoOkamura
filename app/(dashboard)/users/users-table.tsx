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

export function UsersTable({
  users,
  offset,
}: {
  users: any[];
  offset: number;
  totalUsers: number;
}) {
  let router = useRouter();

  // function prevPage() {
  //   router.back();
  // }

  // function nextPage() {
  //   router.push(`/?offset=${offset}`, { scroll: false });
  // }

  return (
    <Card>
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

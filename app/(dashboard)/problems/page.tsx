import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProblemsTable } from './problems-table';
import Link from "next/link";

export default async function Page() {
  const data = await fetch('http://127.0.0.1:8000/problems', { cache: 'no-store' })
  const problems = await data.json();
  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
      問題管理
      </h1>
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="h-8 gap-1">
            <Link href='/create-problem'>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                問題を追加
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <div className="flex flex-col gap-10">
          <ProblemsTable
            problems={problems}
            offset={problems.length}
            totalProblems={problems.length}
          />
        </div>
      </TabsContent>
    </Tabs>
    </div>
  );
}

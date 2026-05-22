// // Admin_コンテスト管理画面


'use client';

import Link from "next/link";
import { useEffect, useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Input } from 'postcss';
import { Input } from "@/components/ui/input"


export default function ProductsPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 読み込み中の画面表示
//   if (loading) {
//     return (null);
//   }

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        コンテスト作成
        </h1>
        <div className='flex flex-col gap-10 mx-auto p-20'>
            <div>
                <p>コンテスト名</p>
                <Input className="max-w-xs" id="contestname" type="text" required />
            </div>
            <div className='flex gap-10'>
                <div>
                    <p>開催日時</p>
                    <Input className="max-w-xs" id="opendate" type="text" required />
                </div>
                <div className='pt-8'>
                    <h2>〜</h2>
                </div>
                <div>
                    <p>終了日時</p>
                    <Input className="max-w-xs" id="closedate" type="text" required />
                </div>
            </div>
            <div>
                <p>コンテストで実施する問題</p>
                <Input className="max-w-xs" id="question" type="text" required />
            </div>
        </div>
        <div className='flex justify-center'>
            <Button asChild><Link href="/admin_contest">作成</Link></Button>
        </div>
    </div>
  );
}

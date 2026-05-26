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
            <Button asChild variant="ghost"><Link href="/users">＜ 戻る</Link></Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            ユーザ編集
            </h1>
            <div className='flex flex-col gap-10 mx-auto p-20'>
                <div>
                    <p>ユーザ名</p>
                    <Input className="max-w-xs" id="contestname" type="text" required />
                </div>
                <div>
                    <p>ログインID</p>
                    <Input className="max-w-xs" id="contestname" type="text" required />
                </div>
                <div>
                    <p>ログインパスワード</p>
                    <Input className="max-w-xs" id="contestname" type="password" required />
                </div>
                <div>
                    <p>ログインパスワード（再入力）</p>
                    <Input className="max-w-xs" id="contestname" type="password" required />
                </div>
            </div>
            <div className='flex justify-center'>
                <Button asChild><Link href="/admin_contest">更新</Link></Button>
            </div>
        </div>
    );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface Problem {
    id: number;
    name: string;
}

export default function AdminContestCreate() {
    const router = useRouter();
    const [contestName, setContestName] = useState('');
    const [openDate, setOpenDate] = useState('');
    const [closeDate, setCloseDate] = useState('');
    const [q1, setQ1] = useState('');
    const [q2, setQ2] = useState('');
    const [q3, setQ3] = useState('');
    const [q4, setQ4] = useState('');
    const [q5, setQ5] = useState('');
    const [q6, setQ6] = useState('');
    const [q7, setQ7] = useState('');
    const [q8, setQ8] = useState('');
    const [q9, setQ9] = useState('');
    const [q10, setQ10] = useState('');
    const [problems, setProblems] = useState<Problem[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/problems')
            .then((res) => res.json())
            .then((data) => setProblems(data));
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (openDate && closeDate) {
            const start = new Date(openDate);
            const end = new Date(closeDate);

            if (start >= end) {
                alert('終了日時は開催日時よりも後の日時を設定してください。');
                return;
            }
        }
        setIsDialogOpen(true);
    };

    const handleConfirmYes = async () => {
        setIsDialogOpen(false);

        const problemIds = [q1, q2].filter(id => id !== '').map(id => Number(id));

        const requestBody = {
            title: contestName,
            start_at: new Date(openDate).toISOString(),
            end_at: new Date(closeDate).toISOString(),
            is_active: true,
            problem_ids: problemIds,
        };

        await fetch('http://127.0.0.1:8000/contests', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        router.push('/admin-contest');
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <Button asChild variant="ghost"><Link href="/admin-contest">＜ 戻る</Link></Button>
            <h1 className="text-2xl font-bold text-center mb-6">コンテスト作成</h1>

            <form onSubmit={handleFormSubmit}>
                <div className='flex flex-col gap-10 mx-auto p-20 max-w-4xl'>
                    <div>
                        <p className="mb-2">コンテスト名</p>
                        <Input className="max-w-xs" type="text" required value={contestName} onChange={(e) => setContestName(e.target.value)} />
                    </div>

                    <div className='flex gap-10 items-end'>
                        <div>
                            <p className="mb-2">開催日時</p>
                            <Input className="max-w-xs" type="datetime-local" required value={openDate} onChange={(e) => setOpenDate(e.target.value)} />
                        </div>
                        <div className='pb-2'><h2>〜</h2></div>
                        <div>
                            <p className="mb-2">終了日時</p>
                            <Input className="max-w-xs" type="datetime-local" required value={closeDate} onChange={(e) => setCloseDate(e.target.value)} />
                        </div>
                    </div>

                    <div>
                        <p className="mb-2">コンテストで実施する問題</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                            
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">1.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q1} onChange={(e) => setQ1(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">2.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q2} onChange={(e) => setQ2(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">3.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q3} onChange={(e) => setQ3(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">4.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q4} onChange={(e) => setQ4(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">5.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q5} onChange={(e) => setQ5(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">6.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q6} onChange={(e) => setQ6(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">7.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q7} onChange={(e) => setQ7(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">8.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q8} onChange={(e) => setQ8(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">9.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q9} onChange={(e) => setQ9(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 w-6">10.</span>
                                <select className="flex h-10 w-full rounded-md border p-2 text-sm" value={q10} onChange={(e) => setQ10(e.target.value)}>
                                    <option value="">選択されていません</option>
                                    {problems.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <Button type="submit">作成</Button>
                </div>
            </form>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md w-full">
                    <DialogHeader><DialogTitle className="text-center">コンテスト確認</DialogTitle></DialogHeader>
                    <div className="flex flex-col gap-4 text-sm">
                        <p className="text-gray-600">以下の内容でコンテスト作成してよろしいですか？</p>
                        <div className="bg-gray-50 p-3 rounded flex flex-col gap-2">
                            <div><strong>コンテスト名:</strong> {contestName}</div>
                            <div><strong>開催日時:</strong> {openDate}</div>
                            <div><strong>終了日時:</strong> {closeDate}</div>
                            <div>
                                <strong>問題:</strong>
                                <ol className="list-decimal list-inside pl-2">
                                    {q1 && <li>{problems.find(p => String(p.id) === q1)?.name}</li>}
                                    {q2 && <li>{problems.find(p => String(p.id) === q2)?.name}</li>}
                                </ol>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="flex justify-center gap-4 mt-4 sm:justify-center">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>いいえ</Button>
                        <Button onClick={handleConfirmYes}>はい</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
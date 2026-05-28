// "use client";

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter } from 'next/navigation';
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter
// } from "@/components/ui/dialog";

// interface Problem {
//     id: number;
//     name: string;
//     time_limit: number;
//     memory_limit: number;
// }

// export default function AdminContestCreate() {
//     const router = useRouter();
//     const [contestName, setContestName] = useState('');
//     const [openDate, setOpenDate] = useState('');
//     const [closeDate, setCloseDate] = useState('');
//     const [selectedQuestions, setSelectedQuestions] = useState<string[]>(Array(10).fill(''));
//     const [problems, setProblems] = useState<Problem[]>([]);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);

//     useEffect(() => {
//         fetch('http://127.0.0.1:8000/problems')
//             .then((res) => {
//                 if (!res.ok) throw new Error('Failed to fetch problems');
//                 return res.json();
//             })
//             .then((data) => setProblems(data))
//             .catch((err) => console.error('問題データの取得失敗:', err));
//     }, []);

//     const handleSelectChange = (value: string, index: number) => {
//         const updated = [...selectedQuestions];
//         updated[index] = value;
//         setSelectedQuestions(updated);
//     };

//     const handleFormSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (openDate && closeDate) {
//             const start = new Date(openDate);
//             const end = new Date(closeDate);

//             if (start >= end) {
//                 alert('終了日時は開催日時よりも後の日時を設定してください。');
//                 return;
//             }
//         }
//         setIsDialogOpen(true);    };

//     const handleConfirmYes = async () => {
//         setIsDialogOpen(false);
//         const problemIds = selectedQuestions
//             .filter((id) => id !== '')
//             .map((id) => Number(id));

//         const requestBody = {
//             title: contestName,
//             start_at: openDate ? new Date(openDate).toISOString() : new Date().toISOString(),
//             end_at: closeDate ? new Date(closeDate).toISOString() : new Date().toISOString(),
//             is_active: true,
//             problem_ids: problemIds,
//         };

//         try {
//             const response = await fetch('http://127.0.0.1:8000/contests', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(requestBody),
//             });

//             if (response.status === 201) {
//                 //alert('コンテストを作成しました。');
//                 router.push('/admin-contest');
//             } else {
//                 const errorData = await response.json();
//                 alert(`作成に失敗しました: ${errorData.detail || 'エラーが発生しました'}`);
//             }
//         } catch (error) {
//             console.error('送信エラー:', error);
//             alert('通信エラーが発生しました。');
//         }
//     };

//     return (
//         <div className="w-full max-w-7xl mx-auto p-4">
//             <Button asChild variant="ghost"><Link href="/admin-contest">＜ 戻る</Link></Button>
            
//             <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//                 コンテスト作成
//             </h1>

//             <form onSubmit={handleFormSubmit}>
//                 <div className='flex flex-col gap-10 mx-auto p-20 max-w-4xl'>
//                     <div>
//                         <p className="mb-2">コンテスト名</p>
//                         <Input
//                             className="max-w-xs"
//                             id="contestname"
//                             type="text"
//                             required
//                             value={contestName}
//                             onChange={(e) => setContestName(e.target.value)}
//                         />
//                     </div>

//                     <div className='flex gap-10 items-end'>
//                         <div>
//                             <p className="mb-2">開催日時</p>
//                             <Input
//                                 className="max-w-xs"
//                                 id="opendate"
//                                 type="datetime-local"
//                                 required
//                                 value={openDate}
//                                 onChange={(e) => setOpenDate(e.target.value)}
//                             />
//                         </div>
//                         <div className='pb-2'>
//                             <h2>〜</h2>
//                         </div>
//                         <div>
//                             <p className="mb-2">終了日時</p>
//                             <Input
//                                 className="max-w-xs"
//                                 id="closedate"
//                                 type="datetime-local"
//                                 required
//                                 value={closeDate}
//                                 onChange={(e) => setCloseDate(e.target.value)}
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <p className="mb-2">コンテストで実施する問題</p>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
//                             {selectedQuestions.map((selectedValue, index) => (
//                                 <div key={index} className="flex items-center gap-2">
//                                     <span className="text-sm text-gray-500 w-6">{index + 1}.</span>
//                                     <select
//                                         className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
//                                         value={selectedValue}
//                                         onChange={(e) => handleSelectChange(e.target.value, index)}
//                                     >
//                                         <option value="">選択されていません</option>
//                                         {problems.map((problem) => (
//                                             <option key={problem.id} value={problem.id}>
//                                                 {problem.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>

//                 <div className='flex justify-center'>
//                     <Button type="submit">作成</Button>
//                 </div>
//             </form>
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//                 <DialogContent className="max-w-md w-full">
//                     <DialogHeader>
//                         <DialogTitle className="text-center">コンテスト確認</DialogTitle>
//                     </DialogHeader>

//                     <div className="flex flex-col gap-4 text-sm">
//                         <p className="text-gray-600">以下の内容でコンテスト作成してよろしいですか？</p>
//                         <div className="bg-gray-50 p-3 rounded flex flex-col gap-2">
//                             <div><strong>コンテスト名:</strong> {contestName}</div>
//                             <div><strong>開催日時:</strong> {openDate}</div>
//                             <div><strong>終了日時:</strong> {closeDate}</div>
//                             <div>
//                                 <strong>問題:</strong>
//                                 <ol className="list-decimal list-inside pl-2">
//                                     {selectedQuestions.filter(q => q !== '').map((qId, i) => {
//                                         const prob = problems.find(p => String(p.id) === String(qId));
//                                         return <li key={i}>{prob ? prob.name : qId}</li>;
//                                     })}
//                                 </ol>
//                             </div>
//                         </div>
//                     </div>

//                     <DialogFooter className="flex justify-center gap-3 mt-4">
//                         <Button variant="outline" onClick={() => setIsDialogOpen(false)}>いいえ</Button>
//                         <Button onClick={handleConfirmYes}>はい</Button>
//                     </DialogFooter>
//                 </DialogContent>
//             </Dialog>
//         </div>
//     );
// }
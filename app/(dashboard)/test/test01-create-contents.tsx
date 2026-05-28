// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// // APIから取得する問題の型定義
// type Problem = {
//   id: string | number;
//   title: string;
// };

// export default function CreateContest() {
//   const router = useRouter();

//   // 入力フォームの状態管理
//   const [contestName, setContestName] = useState("");
//   const [openDate, setOpenDate] = useState("");
//   const [closeDate, setCloseDate] = useState("");
  
//   // 10個の問題プルダウン用の配列（初期値はすべて空文字）
//   const [selectedQuestions, setSelectedQuestions] = useState<string[]>(Array(10).fill(""));

//   // APIから取得した問題一覧を格納する状態
//   const [problems, setProblems] = useState<Problem[]>([]);
//   const [loading, setLoading] = useState(true);

//   // 1. 画面マウント時に問題をGETする
//   useEffect(() => {
//     const fetchProblems = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/problems");
//         if (response.ok) {
//           const data = await response.json();
//           setProblems(data); // 例: [{ id: "1", title: "問題A" }, ...]
//         } else {
//           const errorText = await response.text();
//           console.error(`問題の取得に失敗しました。ステータス: ${response.status}`, errorText);
//         }
//       } catch (error) {
//         console.error("通信エラー:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProblems();
//   }, []);

//   // プルダウン変更時のハンドラー
//   const handleQuestionChange = (index: number, value: string) => {
//     const updated = [...selectedQuestions];
//     updated[index] = value;
//     setSelectedQuestions(updated);
//   };

//   // 2. 作成ボタンクリック時にAPIへPOSTする
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault(); // 画面リロードを防止

//     // 送信するデータ構造の作成
//     const payload = {
//       name: contestName,
//       open_date: openDate,
//       close_date: closeDate,
//       // 空欄を除外して送信したい場合は .filter(Boolean) を挟むと良いです
//       questions: selectedQuestions, 
//     };

//     try {
//       const response = await fetch("http://localhost:8000/contests", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert("コンテストを作成しました！");
//         router.push("/admin-contest"); // 一覧画面などへ遷移
//       } else {
//         alert("作成に失敗しました。入力内容を確認してください。");
//       }
//     } catch (error) {
//       console.error("POST送信エラー:", error);
//       alert("通信エラーが発生しました。");
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <Button asChild variant="ghost">
//         <Link href="/admin-contest">＜ 戻る</Link>
//       </Button>
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//         コンテスト作成
//       </h1>

//       {/* formタグで囲み、onSubmitで発火させる */}
//       <form onSubmit={handleSubmit} className="flex flex-col gap-10 mx-auto p-4 md:p-20 max-w-2xl">
//         <div>
//           <p className="font-medium mb-2">コンテスト名</p>
//           <Input
//             className="max-w-xs"
//             type="text"
//             required
//             value={contestName}
//             onChange={(e) => setContestName(e.target.value)}
//           />
//         </div>

//         <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 sm:items-center">
//           <div>
//             <p className="font-medium mb-2">開催日時</p>
//             <Input
//               className="max-w-xs"
//               type="text"
//               required
//               placeholder="2026-05-01 13:00"
//               value={openDate}
//               onChange={(e) => setOpenDate(e.target.value)}
//             />
//           </div>
//           <div className="pt-4 sm:pt-6 text-center">
//             <h2>〜</h2>
//           </div>
//           <div>
//             <p className="font-medium mb-2">終了日時</p>
//             <Input
//               className="max-w-xs"
//               type="text"
//               required
//               placeholder="2026-05-01 15:00"
//               value={closeDate}
//               onChange={(e) => setCloseDate(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* 問題選択のプルダウンを10個複製 */}
//         <div>
//           <p className="font-medium mb-2">コンテストで実施する問題 (最大10問)</p>
//           {loading ? (
//             <p className="text-sm text-gray-500">問題を読み込み中...</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {selectedQuestions.map((currentValue, index) => (
//                 <div key={index} className="flex items-center gap-2">
//                   <span className="text-sm text-gray-500 w-6">{index + 1}:</span>
//                   <select
//                     className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                     value={currentValue}
//                     onChange={(e) => handleQuestionChange(index, e.target.value)}
//                   >
//                     <option value="">-- 問題を選択してください --</option>
//                     {problems.map((prob) => (
//                       <option key={prob.id} value={prob.id}>
//                         {prob.title}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="flex justify-center mt-6">
//           {/* type="submit" にすることで、クリック時に handleSubmit が走ります */}
//           <Button type="submit">作成</Button>
//         </div>
//       </form>
//     </div>
//   );
// }


// 'use client';

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useEffect } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Trash2, Plus } from 'lucide-react';

// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter
// } from "@/components/ui/dialog";

// export default function ProductsPage() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: "",
//         start_at: "",
//         end_at: "",
//         is_active: "",
//         problem_ids: Array(10).fill(""),
//     });

//     const [availableProblems, setAvailableProblems] = useState<Problem[]>([]);

//     useEffect(() => {
//         const fetchProblems = async () => {
//             try {
//                 const response = await fetch("http://localhost:8000/problems", { cache: 'no-store' });
//                 if (!response.ok) throw new Error("問題の取得に失敗しました");
//                 const data = await response.json();
//                 setAvailableProblems(data);
//             } catch (error) {
//                 console.error(error);
//                 alert("データベースから問題一覧を読み込めませんでした。");
//             }
//         };
//         fetchProblems();
//     }, []);

//     const handleActualSubmit = async () => {
//         setIsDialogOpen(false);
//         setLoading(true);

//         try {
//             const response = await fetch("http://localhost:8000/contests", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "問題の作成に失敗しました");
//             }

//             router.push("/admin-contest");

//         } catch (error: any) {
//             console.error(error);
//             alert(`エラー: ${error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="w-full max-w-7xl mx-auto p-4">
//             <Button asChild variant="ghost"><Link href="/admin-contest">＜ 戻る</Link></Button>
//             <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//             コンテスト作成
//             </h1>
//             <div className='flex flex-col gap-10 mx-auto p-20'>
//                 <div>
//                     <p>コンテスト名</p>
//                     <Input className="max-w-xs" id="contestname" type="text" required />
//                 </div>
//                 <div className='flex gap-10'>
//                     <div>
//                         <p>開催日時</p>
//                         <Input className="max-w-xs" id="opendate" type="text" required />
//                     </div>
//                     <div className='pt-8'>
//                         <h2>〜</h2>
//                     </div>
//                     <div>
//                         <p>終了日時</p>
//                         <Input className="max-w-xs" id="closedate" type="text" required />
//                     </div>
//                 </div>
//                 <div>
//                     <p>コンテストで実施する問題</p>
//                     <Input className="max-w-xs" id="question" type="text" required />
//                 </div>
//             </div>
//             <div className='flex justify-center'>
//                 <Button asChild><Link href="/admin-contest">作成</Link></Button>
//             </div>
//         </div>
//     );
// }

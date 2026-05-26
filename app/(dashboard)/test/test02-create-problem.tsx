    // return (
    //     <div className="w-full max-w-7xl mx-auto p-4">
    //         <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
    //         問題作成
    //         </h1>
    //         <div className='flex flex-col gap-10 max-w-3xl mx-auto p-20'>
    //             <div>
    //                 <p>問題名</p>
    //                 <Input className="w-full" id="contestname" type="text" required />
    //             </div>
    //             <div className='flex gap-4'>
    //                 <div>
    //                     <p>実行時間制限</p>
    //                     <Input className="w-full" id="opendate" type="text" required />
    //                 </div>
    //                 <div className='pt-10 pr-10'>
    //                     <h2>ms</h2>
    //                 </div>
    //                 <div>
    //                     <p>メモリ制限</p>
    //                     <Input className="w-full" id="opendate" type="text" required />
    //                 </div>
    //                 <div className='pt-10 pr-10'>
    //                     <h2>GB</h2>
    //                 </div>
    //             </div>
    //             <div>
    //                 <p>問題文</p>
    //                 <Textarea sizeVariant="lg" className="w-full" id="question" required />
    //             </div>
    //             <div>
    //                 <p>入力フォーマット</p>
    //                 <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //             </div>
    //             <div>
    //                 <p>出力フォーマット</p>
    //                 <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //             </div>
    //             <div className='flex gap-4'>
    //                 <div>
    //                     <p>テストinput_01</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //                 <div>
    //                     <p>正解output_01</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //             </div>
    //             <div className='flex gap-4'>
    //                 <div>
    //                     <p>テストinput_02</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //                 <div>
    //                     <p>正解output_02</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //             </div>
    //             <div className='flex gap-4'>
    //                 <div>
    //                     <p>テストinput_03</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //                 <div>
    //                     <p>正解output_03</p>
    //                     <Textarea sizeVariant="sm" className="w-full" id="question" required />
    //                 </div>
    //             </div>
    //         </div>
    //         <div className='flex justify-center'>
    //             <Button asChild><Link href="/admin-contest">作成</Link></Button>
    //         </div>
    //     </div>
    // );


// 'use client';

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// // 自作したピュアなDialogコンポーネント群をインポート
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter
// } from "@/components/ui/dialog";

// export default function ProductsPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [isDialogOpen, setIsDialogOpen] = useState(false); // 確認ダイアログの開閉状態

//   // 1. フォームの初期値（仕様書のplaceholderを参考に反映）
//   const [formData, setFormData] = useState({
//     name: "",
//     time_limit: "",       // カンマ表示対応のため、文字列で管理（API送信時に数値化）
//     memory_limit: "",     // 仕様書より、初期値空（placeholder: 1）
//     problem_statement: "",
//     input_format: "",
//     output_format: "",
//     test_input_01: "",
//     test_output_01: "",
//     test_input_02: "",
//     test_output_02: "",
//     test_input_03: "",
//     test_output_03: "",
//   });

//   // 入力値変更ハンドラー
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;

//     // 実行時間制限：半角数字のみ、3桁カンマ区切りの制御
//     if (name === "time_limit") {
//       const numValue = value.replace(/,/g, ""); // 一旦カンマを除く
//       if (numValue === "" || /^[0-9]+$/.test(numValue)) {
//         // 3桁区切りのフォーマットに変換
//         const formatted = numValue ? Number(numValue).toLocaleString() : "";
//         setFormData((prev) => ({ ...prev, [name]: formatted }));
//       }
//       return;
//     }

//     // メモリ制限：半角数字のみ
//     if (name === "memory_limit") {
//       if (value === "" || /^[0-9]+$/.test(value)) {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//       }
//       return;
//     }

//     // その他の項目
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 「作成」ボタン（青色）を押したとき：仕様に基づき、まずはダイアログを開く
//   const handleOpenConfirm = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // 仕様書：問題文1,000文字以内とするバリデーション [cite: 68]
//     if (formData.problem_statement.length > 1000) {
//       alert("問題文は1,000文字以内で入力してください。");
//       return;
//     }
    
//     setIsDialogOpen(true);
//   };

//   // ダイアログ内の「はい」を押したとき：実際にFastAPIのAPIを呼び出す [cite: 177, 179]
//   const handleActualSubmit = async () => {
//     setIsDialogOpen(false);
//     setLoading(true);

//     // 送信用にデータを整形（カンマの除去や数値への型変換）
//     const payload = {
//       ...formData,
//       time_limit: Number(formData.time_limit.replace(/,/g, "")),
//       memory_limit: Number(formData.memory_limit),
//     };

//     try {
//       // ※お使いのFastAPIのURLに合わせて変更してください
//       const response = await fetch("http://localhost:8000/problems", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       // HTTP status code 200または201の場合は、問題管理画面へリダイレクト [cite: 180]
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.detail || "問題の作成に失敗しました");
//       }

//       alert("問題を作成しました！");
//       router.push("/admin-contest"); // リダイレクト [cite: 180]

//     } catch (error: any) {
//       console.error(error);
//       alert(`エラー: ${error.message}`); // 内容に応じたエラー対応 [cite: 181]
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//         問題作成
//       </h1>
      
//       {/* フォーム送信時に確認ダイアログを開く */}
//       <form onSubmit={handleOpenConfirm} className='flex flex-col gap-10 max-w-3xl mx-auto p-10 border rounded-lg bg-white shadow-sm'>
//         <div>
//           <p className="font-semibold mb-1">問題名</p>
//           <Input 
//             className="w-full" 
//             name="name" 
//             type="text" 
//             placeholder="bubble sort" 
//             value={formData.name} 
//             onChange={handleChange} 
//             required 
//           />
//         </div>

//         <div className='flex gap-4 items-end'>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">実行時間制限</p>
//             <Input 
//               className="w-full" 
//               name="time_limit" 
//               type="text" 
//               inputMode="numeric"
//               placeholder="2,000" 
//               value={formData.time_limit} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className='pb-2 pr-4'>
//             <span className="text-lg font-bold">ms</span>
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">メモリ制限</p>
//             <Input 
//               className="w-full" 
//               name="memory_limit" 
//               type="text" 
//               inputMode="numeric"
//               placeholder="1" 
//               value={formData.memory_limit} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className='pb-2 pr-4'>
//             <span className="text-lg font-bold">GB</span>
//           </div>
//         </div>

//         <div>
//           <p className="font-semibold mb-1">問題文（1,000文字以内）</p>
//           <Textarea 
//             className="w-full min-h-[120px]" 
//             name="problem_statement" 
//             placeholder="問題文を記載してください(1,000文字以内)"
//             value={formData.problem_statement} 
//             onChange={handleChange} 
//             required 
//           />
//           <p className="text-xs text-gray-400 text-right mt-1">{formData.problem_statement.length}/1000文字</p>
//         </div>

//         <div>
//           <p className="font-semibold mb-1">入力フォーマット</p>
//           <Textarea 
//             className="w-full" 
//             name="input_format" 
//             placeholder={"N Q\nA(1) A(2) A(3) ... A(N)"}
//             value={formData.input_format} 
//             onChange={handleChange} 
//             required 
//           />
//         </div>

//         <div>
//           <p className="font-semibold mb-1">出力フォーマット</p>
//           <Textarea 
//             className="w-full" 
//             name="output_format" 
//             placeholder="並べ替えた値を出力しなさい"
//             value={formData.output_format} 
//             onChange={handleChange} 
//             required 
//           />
//         </div>

//         {/* テストケース 01 */}
//         <div className='flex gap-4'>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">テストinput_01</p>
//             <Textarea 
//               className="w-full" 
//               name="test_input_01" 
//               placeholder="1 2 3"
//               value={formData.test_input_01} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">正解output_01</p>
//             <Textarea 
//               className="w-full" 
//               name="test_output_01" 
//               placeholder="4"
//               value={formData.test_output_01} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//         </div>

//         {/* テストケース 02 */}
//         <div className='flex gap-4'>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">テストinput_02</p>
//             <Textarea 
//               className="w-full" 
//               name="test_input_02" 
//               placeholder="5 6 7"
//               value={formData.test_input_02} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">正解output_02</p>
//             <Textarea 
//               className="w-full" 
//               name="test_output_02" 
//               placeholder="8"
//               value={formData.test_output_02} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//         </div>

//         {/* テストケース 03 */}
//         <div className='flex gap-4'>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">テストinput_03</p>
//             <Textarea 
//               className="w-full" 
//               name="test_input_03" 
//               placeholder="9 10 11"
//               value={formData.test_input_03} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold mb-1">正解output_03</p>
//             <Textarea 
//               className="w-full" 
//               name="test_output_03" 
//               placeholder="12"
//               value={formData.test_output_03} 
//               onChange={handleChange} 
//               required 
//             />
//           </div>
//         </div>

//         <div className='flex justify-center gap-4 mt-4'>
//           <Button type="button" variant="outline" asChild>
//             <Link href="/admin-contest">キャンセル</Link>
//           </Button>
//           <Button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-8">
//             作成
//           </Button>
//         </div>
//       </form>

//       {/* 自作した内製Dialogコンポーネントでの「問題確認ダイアログ」 */}
//       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//         {/* max-w-2xl で、中身が多くても綺麗に見えるように横幅を拡張 */}
//         <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
//           <DialogHeader>
//             <DialogTitle className="text-xl font-bold text-center">問題確認</DialogTitle>
//           </DialogHeader>
          
//           <div className="space-y-4 my-4 text-sm bg-gray-50 p-4 rounded border">
//             <p className="font-medium text-base text-gray-700 border-b pb-2">以下の内容問題で作成してよろしいですか?</p>
            
//             <div>
//               <span className="font-bold block">■ 問題名</span>
//               <p className="whitespace-pre-wrap pl-2 text-gray-600">{formData.name}</p>
//             </div>
//             <div className="flex gap-8">
//               <div>
//                 <span className="font-bold block">■ 実行時間制限</span>
//                 <p className="pl-2 text-gray-600">{formData.time_limit} ms</p>
//               </div>
//               <div>
//                 <span className="font-bold block">■ メモリ制限</span>
//                 <p className="pl-2 text-gray-600">{formData.memory_limit} GB</p>
//               </div>
//             </div>
//             <div>
//               <span className="font-bold block">■ 問題文</span>
//               <p className="whitespace-pre-wrap pl-2 text-gray-600">{formData.problem_statement}</p>
//             </div>
//             <div>
//               <span className="font-bold block">■ 入力フォーマット</span>
//               <p className="whitespace-pre-wrap pl-2 text-gray-600 font-mono bg-white p-2 rounded border text-xs">{formData.input_format}</p>
//             </div>
//             <div>
//               <span className="font-bold block">■ 出力フォーマット</span>
//               <p className="whitespace-pre-wrap pl-2 text-gray-600">{formData.output_format}</p>
//             </div>
            
//             <div className="grid grid-cols-2 gap-2 border-t pt-2">
//               <div>
//                 <span className="font-bold block">■ テストinput_1</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_01}</p>
//               </div>
//               <div>
//                 <span className="font-bold block">■ テストoutput_1</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_01}</p>
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <span className="font-bold block">■ テストinput_2</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_02}</p>
//               </div>
//               <div>
//                 <span className="font-bold block">■ テストoutput_2</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_02}</p>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-2">
//               <div>
//                 <span className="font-bold block">■ テストinput_3</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_03}</p>
//               </div>
//               <div>
//                 <span className="font-bold block">■ テストoutput_3</span>
//                 <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_03}</p>
//               </div>
//             </div>
//           </div>

//           <DialogFooter className="flex justify-center gap-4 sm:justify-center">
//             {/* ① いいえ ボタン: 何もせずダイアログを閉じる [cite: 182, 183] */}
//             <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="px-6">
//               いいえ
//             </Button>
//             {/* ② はい ボタン: バリデーション後にAPIへ通信 [cite: 177, 179] */}
//             <Button type="button" onClick={handleActualSubmit} className="bg-blue-500 hover:bg-blue-600 text-white px-8">
//               はい
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
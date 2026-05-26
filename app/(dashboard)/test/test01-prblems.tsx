// // コンテストテーブルの行設定


// 'use client';

// import Link from "next/link";
// import { Button } from '@/components/ui/button';
// import { TableCell, TableRow } from '@/components/ui/table';
// import { Trash2 } from 'lucide-react';
// import { deleteProduct } from '../actions'; 

// // Supabaseのデータ構造の定義
// interface Problem {
//   id: number;
//   name: string;
//   time_limit: number;
//   memory_limit: number;
// }

// export function Problem({ problem }: { problem: Problem}) {


//   return (
//     <TableRow>

//       <TableCell className="font-medium">{problem.name}</TableCell>


//       <TableCell>{problem.time_limit}</TableCell>

//       <TableCell>{problem.memory_limit}</TableCell>

//       <TableCell>
//         <Button
//           asChild
//           variant="outline"
//           size="sm"
//           className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
//           // onClick={() => {
//           //   // ここに編集画面を開く処理（モーダルを開く、またはページ遷移など）を書きます
//           //   console.log(`${problem.id} の編集ボタンが押されました`);
//           // }}
//         >
//           <Link href='/edit-problem'>編集</Link>
//         </Button>
//       </TableCell>


//       <TableCell>
//         <form action={deleteProduct}>
//           <input type="hidden" name="id" value={problem.id} />
//           <Button
//             size="icon"
//             variant="ghost"
//             type="submit"
//             className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
//           >
//             <Trash2 className="h-4 w-4" />
//             <span className="sr-only">削除</span>
//           </Button>
//         </form>
//       </TableCell>
//     </TableRow>
//   );
// }


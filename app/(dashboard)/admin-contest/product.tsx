// // コンテストテーブルの行設定


// 'use client';

// import Link from "next/link";
// import { Button } from '@/components/ui/button';
// import { TableCell, TableRow } from '@/components/ui/table';
// import { Trash2 } from 'lucide-react';
// import { deleteProduct } from '../actions'; 
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogFooter
// } from "@/components/ui/dialog";
// import { useRouter } from "next/router";
// import { useState } from "react";

// // Supabaseのデータ構造の定義
// interface Contest {
//   id: number;
//   contest_name: string;
//   start_time: string | Date;
//   end_time: string | Date;
//   is_active: boolean;
// }

// export function Product({ product, title }: { product: Contest, title: 'schedule' | 'inProgress' | 'end' }) {
//   const router = useRouter();
//       const [isDeleting, setIsDeleting] = useState(false);
//       const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態
//   // 日時を「2026/05/19 15:00」のような形式に変換する関数
//   const formatDateTime = (dateTimeStr: string | Date) => {
//     if (!dateTimeStr) return '-';
//     const date = new Date(dateTimeStr);
//     return date.toLocaleString('ja-JP', {
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const handleActualDelete = async () => {
//         setIsDialogOpen(false); // ダイアログを閉じる
//         setIsDeleting(true);

//         try {
//             // 仕様書通り、URLの末尾にIDを付与してDELETEリクエストを送信
//             const response = await fetch(`http://127.0.0.1:8000/contests/${product.id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.detail || "問題の削除に失敗しました");
//             }

//             // 画面を最新の状態に更新（一覧から消える）
//             router.refresh();

//         } catch (error: any) {
//             console.error(error);
//             alert(`エラー: ${error.message}`);
//         } finally {
//             setIsDeleting(false);
//         }
//     };

//   return (
//     <TableRow>
//       {/* 【2列目：コンテスト名】 
//           親の「コンテスト名」に対応 */}
//       <TableCell className="font-medium">{product.contest_name}</TableCell>

//       {/* 【3列目：開催日時】 
//           親の「開催日時」に対応 */}
//       <TableCell>{formatDateTime(product.start_time)}</TableCell>

//       {/* 【4列目：終了日時】 
//           親の「終了日時」に対応 */}
//       <TableCell>{formatDateTime(product.end_time)}</TableCell>

//       {/* 【5列目：アクション】 
//           親の「アクション」に対応（現在は中身は空ですが、列の数を合わせるために必須です） */}
//       <TableCell className={title === 'schedule' ? '' : 'invisible'}>
//         <Button
//           asChild
//           variant="outline"
//           size="sm"
//           className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
//           // onClick={() => {
//           //   // ここに編集画面を開く処理（モーダルを開く、またはページ遷移など）を書きます
//           //   console.log(`${product.id} の編集ボタンが押されました`);
//           // }}
//         >
//           <Link href='/edit-contest'>編集</Link>
//         </Button>
//       </TableCell>

//       {/* 【6列目：削除（ゴミ箱）】 
//           親の「Delet（削除）」に対応 */}
//       <TableCell className={title === 'schedule' ? 'text-right' : 'invisible'}>
//         <form action={deleteProduct}>
//           <input type="hidden" name="id" value={product.id} />
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


'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

// Dialogパーツのインポート
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

// API（FastAPI）から取得するコンテストデータの構造定義
interface Contest {
    id: number;
    title: string;
    start_at: string;
    end_at: string;
}

export function Product({ product, title }: { product: Contest, title: 'schedule' | 'inProgress' | 'end' }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false); // ダイアログの開閉状態

    // 日時を「2026/05/19 15:00」のような形式に変換する関数
    const formatDateTime = (dateTimeStr: string) => {
        if (!dateTimeStr) return '-';
        const date = new Date(dateTimeStr);
        return date.toLocaleString('ja-JP', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // ダイアログ内の「削除する」ボタンが押された時の実際の処理
    const handleActualDelete = async () => {
        setIsDialogOpen(false);
        setIsDeleting(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/contests/${product.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "コンテストの削除に失敗しました");
            }

            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert(`エラー: ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <TableRow>
                {/* 【コンテスト名】 schedule の時だけ表示。それ以外はあえて invisible */}
                <TableCell className="font-medium" >
                    {product.title}
                </TableCell>

                {/* 【開催日時】 常に表示 */}
                <TableCell>{formatDateTime(product.start_at)}</TableCell>

                {/* 【終了日時】 常に表示 */}
                <TableCell>{formatDateTime(product.end_at)}</TableCell>

                {/* 【アクション（編集）】 schedule の時だけ表示。それ以外はあえて invisible */}
                <TableCell className={title === 'schedule' ? '' : 'invisible'}>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <Link href={`/edit-contest/${product.id}`}>編集</Link>
                    </Button>
                </TableCell>

                {/* 【削除（ゴミ箱）】 schedule の時だけ表示。それ以外はあえて invisible */}
                <TableCell className={title === 'schedule' ? 'text-right' : 'invisible'}>
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(true)}
                        disabled={isDeleting}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">削除</span>
                    </Button>
                </TableCell>
            </TableRow>

            {/* 削除確認ダイアログ */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-lg font-semibold text-center text-zinc-900">
                            コンテストを削除しますか？
                        </DialogTitle>
                    </DialogHeader>

                    <div className="text-sm text-zinc-500 text-center mb-6">
                        <p>コンテスト「<span className="font-semibold text-zinc-900">{product.title}</span>」を削除してもよろしいですか？</p>
                    </div>

                    <DialogFooter className="flex justify-center gap-3 sm:justify-center">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsDialogOpen(false)} 
                            className="px-6 border-zinc-200 text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 transition-colors"
                        >
                            戻る
                        </Button>
                        <Button 
                            type="button" 
                            onClick={handleActualDelete} 
                            className="bg-red-600 hover:bg-red-700 text-white px-6 transition-colors"
                        >
                            削除する
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
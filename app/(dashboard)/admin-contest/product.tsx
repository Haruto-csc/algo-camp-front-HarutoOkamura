'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import { Trash2 } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

interface Contest {
    id: number;
    title: string;
    start_at: string;
    end_at: string;
}

export function Product({ product, title }: { product: Contest, title: 'schedule' | 'inProgress' | 'end' }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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
                <TableCell className="font-medium" >
                    {product.title}
                </TableCell>

                <TableCell>{formatDateTime(product.start_at)}</TableCell>

                <TableCell>{formatDateTime(product.end_at)}</TableCell>

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
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

interface UserStructure {
    id: number;
    name: string;
    login_id: string;
    login_password: string;
}

export function User({ user }: { user: UserStructure }) {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleActualDelete = async () => {
        setIsDialogOpen(false);
        setIsDeleting(true);

        try {
            const response = await fetch(`http://127.0.0.1:8000/users/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "問題の削除に失敗しました");
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
                <TableCell className="font-medium">{user.name}</TableCell>

                <TableCell>{user.login_id}</TableCell>

                <TableCell>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <Link href={`/edit-user/${user.id}`}>編集</Link>
                    </Button>
                </TableCell>

                <TableCell className="text-right">
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
                            問題を削除しますか？
                        </DialogTitle>
                    </DialogHeader>

                    <div className="text-sm text-zinc-500 text-center mb-6">
                        <p>問題「<span className="font-semibold text-zinc-900">{user.name}</span>」を削除してもよろしいですか？</p>
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
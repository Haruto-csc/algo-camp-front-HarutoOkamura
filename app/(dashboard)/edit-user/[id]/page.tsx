'use client';

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";

export default function ProductsPage() {
    const router = useRouter();
    const params = useParams();
    const userId = params.id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        login_id: "",
        login_password: "",
        check_password: ""
    });

    const [initialData, setInitialData] = useState<typeof formData | null>(null);

    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/users/${userId}`, {
                    cache: 'no-store'
                });
                if (!response.ok) {
                    throw new Error("データの取得に失敗しました");
                }
                const data = await response.json();

                const loadedData = {
                    name: data.name || "",
                    login_id: data.login_id || "",
                    login_password: data.login_password || "",
                    check_password: data.check_password || "",
                };

                setFormData(loadedData);
                setInitialData(loadedData);
            } catch (error) {
                console.error(error);
                alert("初期データの読み込みに失敗しました。");
                router.push("/users");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchUserData();
    }, [userId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenConfirm = (e: React.FormEvent) => {
        e.preventDefault();

        setIsDialogOpen(true);
    };

    const handleActualSubmit = async () => {
        setIsDialogOpen(false);
        setLoading(true);
        if (formData.login_password !== formData.check_password) {
            alert("パスワードが一致していません。")
            return;
        }
        const { check_password, ...payload } = formData;


        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "アカウントの更新に失敗しました");
            }

            router.push("/users");
            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert(`エラー: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const isUnchanged = JSON.stringify(formData) === JSON.stringify(initialData);
    const allcheck = formData.name && formData.login_id && formData.login_password && formData.login_password === formData.check_password;

    if (initialLoading) {
        return (
            <div className="w-full text-center p-20 text-zinc-500">
                既存データを読み込み中...
            </div>
        );
    }

    return (
<div className="w-full max-w-7xl mx-auto p-4">
            <Button asChild variant="ghost"><Link href="/users">＜ 戻る</Link></Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                ユーザ編集
            </h1>
            <form onSubmit={handleOpenConfirm}>
                <div className='flex flex-col gap-10 max-w-3xl mx-auto p-20'>
                    <div>
                        <p>ユーザ名</p>
                        <Input
                            className="w-full"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <p>ログインID</p>
                        <Input
                            className="w-full"
                            name="login_id"
                            type="text"
                            value={formData.login_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <p>ログインパスワード</p>
                        <Input
                            className="w-full"
                            name="login_password"
                            type="password"
                            value={formData.login_password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <p>ログインパスワード（再入力）</p>
                        <Input
                            className="w-full"
                            name="check_password"
                            type="password"
                            value={formData.check_password}
                            onChange={handleChange}
                            required
                        />
                        {formData.check_password && formData.login_password !== formData.check_password ? (
                            <p className="text-red-500 text-xs mt-1 h-4 leading-none">
                                パスワードが一致していません。
                            </p>
                            ) : (
                                <p className="invisible text-xs mt-1 h-4 leading-none"></p>
                            )}
                    </div>

                </div>

                <div className='flex justify-center'>
                    <Button
                        type="submit"
                        disabled={loading || isUnchanged || !allcheck}
                        className="bg-zinc-900 hover:bg-zinc-500 text-white disabled:pointer-events-none disabled:opacity-50 px-8"
                    >
                        更新
                    </Button>
                </div>
            </form>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-auto max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center font-semibold">確認</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 text-sm p-4">
                        <p className="font-medium border-b pb-2">以下の情報でユーザを作成してよろしいですか？</p>

                        <div>
                            <span>ユーザ名</span>
                            <p className="pl-2 font-mono bg-white p-2 rounded border text-xs">{formData.name}</p>
                        </div>
                        <div>
                            <span>ログインID</span>
                            <p className="pl-2 font-mono bg-white p-2 rounded border text-xs">{formData.login_id}</p>
                        </div>
                        <div>
                            <span>パスワード</span>
                            <p className="pl-2 font-mono bg-white p-2 rounded border text-xs">非表示</p>
                        </div>

                    </div>

                    <DialogFooter className="flex justify-center gap-4 sm:justify-center">
                        <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="px-6">
                            いいえ
                        </Button>
                        <Button type="button" onClick={handleActualSubmit} className="bg-zinc-900 hover:bg-zinc-500 text-white disabled:pointer-events-none px-8">
                            はい
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
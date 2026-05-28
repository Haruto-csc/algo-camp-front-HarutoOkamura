'use client';

import Link from "next/link";
import { useRouter, useParams } from "next/navigation"; // useParamsを追加
import { useState, useEffect } from 'react'; // useEffectを追加
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    const problemId = params.id;

    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        time_limit: "",
        memory_limit: "",
        problem_statement: "",
        input_format: "",
        output_format: "",
        test_input_01: "",
        test_output_01: "",
        test_input_02: "",
        test_output_02: "",
        test_input_03: "",
        test_output_03: "",
    });

    const [initialData, setInitialData] = useState<typeof formData | null>(null);

    useEffect(() => {
        if (!problemId) return;

        const fetchProblemData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/problems/${problemId}`, {
                    cache: 'no-store'
                });
                if (!response.ok) {
                    throw new Error("データの取得に失敗しました");
                }
                const data = await response.json();

                const loadedData = {
                    name: data.name || "",
                    time_limit: data.time_limit ? String(data.time_limit) : "",
                    memory_limit: data.memory_limit ? String(data.memory_limit) : "",
                    problem_statement: data.problem_statement || "",
                    input_format: data.input_format || "",
                    output_format: data.output_format || "",
                    test_input_01: data.test_input_01 || "",
                    test_output_01: data.test_output_01 || "",
                    test_input_02: data.test_input_02 || "",
                    test_output_02: data.test_output_02 || "",
                    test_input_03: data.test_input_03 || "",
                    test_output_03: data.test_output_03 || "",
                };

                setFormData(loadedData);
                setInitialData(loadedData);
            } catch (error) {
                console.error(error);
                alert("初期データの読み込みに失敗しました。");
                router.push("/problems");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchProblemData();
    }, [problemId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenConfirm = (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.problem_statement.length > 1000) {
            alert("問題文は1,000文字以内で入力してください。");
            return;
        }

        setIsDialogOpen(true);
    };

    const handleActualSubmit = async () => {
        setIsDialogOpen(false);
        setLoading(true);

        const payload = {
            ...formData,
            time_limit: Number(String(formData.time_limit).replace(/,/g, "")),
            memory_limit: Number(formData.memory_limit),
        };

        try {
            const response = await fetch(`http://localhost:8000/problems/${problemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "問題の更新に失敗しました");
            }

            router.push("/problems");
            router.refresh();

        } catch (error: any) {
            console.error(error);
            alert(`エラー: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const isUnchanged = JSON.stringify(formData) === JSON.stringify(initialData);

    if (initialLoading) {
        return (
            <div className="w-full text-center p-20 text-zinc-500">
                既存データを読み込み中...
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
        <Button asChild variant="ghost"><Link href="/problems">＜ 戻る</Link></Button>
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                問題編集
            </h1>
            <form onSubmit={handleOpenConfirm}>
                <div className='flex flex-col gap-10 max-w-3xl mx-auto p-20'>
                    <div>
                        <p>問題名</p>
                        <Input
                            className="w-full"
                            name="name"
                            type="text"
                            placeholder="bubble sort"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex gap-4'>
                        <div>
                            <p>実行時間制限</p>
                            <Input
                                className="w-full"
                                name="time_limit"
                                type="text"
                                pattern="[0-9,]*"
                                placeholder="2,000"
                                value={formData.time_limit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='pt-10 pr-10'>
                            <h2>ms</h2>
                        </div>
                        <div>
                            <p>メモリ制限</p>
                            <Input
                                className="w-full"
                                name="memory_limit"
                                type="text"
                                pattern="[0-9.]*"
                                placeholder="1"
                                value={formData.memory_limit}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='pt-10 pr-10'>
                            <h2>GB</h2>
                        </div>
                    </div>

                    <div>
                        <p>問題文（1,000文字以内）</p>
                        <Textarea
                            sizeVariant="lg"
                            className="w-full"
                            name="problem_statement"
                            placeholder="問題文を記載してください(1,000文字以内)"
                            value={formData.problem_statement}
                            onChange={handleChange}
                            required
                        />
                        <p className="text-xs text-gray-400 text-right mt-1">
                            {formData.problem_statement.length}/1000文字
                        </p>
                    </div>

                    <div>
                        <p>入力フォーマット</p>
                        <Textarea
                            sizeVariant="sm"
                            className="w-full"
                            name="input_format"
                            placeholder={"N Q\nA(1) A(2) A(3) ... A(N)"}
                            value={formData.input_format}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <p>出力フォーマット</p>
                        <Textarea
                            sizeVariant="sm"
                            className="w-full"
                            name="output_format"
                            placeholder="並べ替えた値を出力しなさい"
                            value={formData.output_format}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className='flex gap-4'>
                        <div className="w-full">
                            <p>テストinput_01</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_input_01"
                                placeholder="1 2 3"
                                value={formData.test_input_01}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <p>正解output_01</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_output_01"
                                placeholder="4"
                                value={formData.test_output_01}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className="w-full">
                            <p>テストinput_02</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_input_02"
                                placeholder="5 6 7"
                                value={formData.test_input_02}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <p>正解output_02</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_output_02"
                                placeholder="8"
                                value={formData.test_output_02}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className='flex gap-4'>
                        <div className="w-full">
                            <p>テストinput_03</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_input_03"
                                placeholder="9 10 11"
                                value={formData.test_input_03}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <p>正解output_03</p>
                            <Textarea
                                sizeVariant="sm"
                                className="w-full"
                                name="test_output_03"
                                placeholder="12"
                                value={formData.test_output_03}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className='flex justify-center'>
                    <Button
                        type="submit"
                        disabled={loading || isUnchanged}
                        className="bg-zinc-900 hover:bg-zinc-500 text-white disabled:pointer-events-none disabled:opacity-50 px-8"
                    >
                        更新
                    </Button>
                </div>
            </form>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-auto max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center font-semibold">問題確認</DialogTitle>
                    </DialogHeader>

                    <div className="space-y-4 text-sm p-4">
                        <p className="font-medium border-b pb-2">以下の内容問題で作成してよろしいですか？</p>

                        <div>
                            <span>問題名</span>
                            <p className="pl-2 font-mono bg-white p-2 rounded border text-xs">{formData.name}</p>
                        </div>
                        <div className="flex gap-8">
                            <div>
                                <span>実行時間制限</span>
                                <p className="pl-2 text-gray-600">{formData.time_limit} ms</p>
                            </div>
                            <div>
                                <span>メモリ制限</span>
                                <p className="pl-2 text-gray-600">{formData.memory_limit} GB</p>
                            </div>
                        </div>
                        <div>
                            <span>問題文</span>
                            <p className="whitespace-pre-wrap pl-2 text-gray-600 font-mono bg-white p-2 rounded border text-xs">{formData.problem_statement}</p>
                        </div>
                        <div>
                            <span>入力フォーマット</span>
                            <p className="whitespace-pre-wrap pl-2 text-gray-600 font-mono bg-white p-2 rounded border text-xs">{formData.input_format}</p>
                        </div>
                        <div>
                            <span>出力フォーマット</span>
                            <p className="whitespace-pre-wrap pl-2 text-gray-600 font-mono bg-white p-2 rounded border text-xs">{formData.output_format}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 border-t pt-2">
                            <div>
                                <span>テストinput_1</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_01}</p>
                            </div>
                            <div>
                                <span>テストoutput_1</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_01}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span>テストinput_2</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_02}</p>
                            </div>
                            <div>
                                <span>テストoutput_2</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_02}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <span>テストinput_3</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_input_03}</p>
                            </div>
                            <div>
                                <span>テストoutput_3</span>
                                <p className="whitespace-pre-wrap pl-2 text-gray-600 bg-white p-1 rounded border font-mono text-xs">{formData.test_output_03}</p>
                            </div>
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
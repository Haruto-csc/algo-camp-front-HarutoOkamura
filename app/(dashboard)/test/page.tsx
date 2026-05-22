'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // FastAPIのURL。ポートが異なる場合は適宜変更してください
    fetch('http://localhost:8000/api/test')
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setResult({ status: 'error', message: err.message });
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-8 text-center font-bold">Supabase ➔ FastAPI からデータを取得中...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold border-b pb-2">📦 コンテストデータ 疎通確認</h1>
      
      {result?.status === 'success' ? (
        <div className="space-y-4">
          <p className="text-green-600 font-semibold">✅ 3者間（Next.js - FastAPI - Supabase）の疎通に成功しました！</p>
          
          <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-sm font-medium text-gray-600">
                  <th className="p-3">コンテスト名</th>
                  <th className="p-3">開催日時</th>
                  <th className="p-3">終了日時</th>
                  <th className="p-3">状態</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm text-gray-700">
                {result.data.map((contest: any) => (
                  <tr key={contest.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold text-blue-600">{contest.contest_name}</td>
                    <td className="p-3">{new Date(contest.start_time).toLocaleString('ja-JP')}</td>
                    <td className="p-3">{new Date(contest.end_time).toLocaleString('ja-JP')}</td>
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {contest.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">
          <p className="font-semibold">❌ 接続またはデータ取得に失敗しました</p>
          <p className="text-sm my-2">※ FastAPIが起動しているか、CORS設定が正しいか確認してください。</p>
          <p className="mt-2 text-xs font-mono bg-white p-2 rounded border overflow-x-auto">
            {JSON.stringify(result, null, 2)}
          </p>
        </div>
      )}
    </div>
  );
}
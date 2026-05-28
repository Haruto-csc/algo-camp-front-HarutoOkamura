// 'use client';

// import { useEffect, useState } from 'react';
// import { Tabs, TabsContent } from '@/components/ui/tabs';
// import { PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ProductsTable } from './contests_table';

// export default function ProductsPage() {
//   const [contests, setContests] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);


//   return (
//     <div className="w-full max-w-7xl mx-auto p-4">
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
//       開催中コンテスト一覧
//     </h1>
//     <Tabs defaultValue="all">
//       <TabsContent value="all">
//         <div className="flex flex-col gap-10">
//           <ProductsTable
//             products={contests}
//             offset={contests.length}
//             totalProducts={contests.length}
//           />
//         </div>
//       </TabsContent>
//     </Tabs>
//     </div>
//   );
// }
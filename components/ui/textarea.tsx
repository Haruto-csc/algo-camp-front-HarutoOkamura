import * as React from 'react';

import { cn } from '@/lib/utils';

// size オプションの型定義
export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    sizeVariant?: 'sm' | 'lg'; // 'size' は標準属性と衝突するため 'sizeVariant' としています
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, sizeVariant = 'sm', ...props }, ref) => {
    return (
        <textarea
        className={cn(
            'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            sizeVariant === 'sm' ? 'min-h-[30px]' : 'min-h-[200px]',
            className
        )}
        ref={ref}
        {...props}
        />
        );
    }
);
Textarea.displayName = 'Textarea';

export { Textarea };
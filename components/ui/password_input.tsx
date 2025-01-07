'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

const PasswordInput = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    function handleToggle() {
        setIsVisible((prev) => !prev);
    }

    return (
        <div className="relative">
            <input
                className={cn(
                    'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    className
                )}
                ref={ref}
                {...props}
                type={isVisible ? 'text' : 'password'}
            />

            <Button
                tabIndex={-1}
                variant="ghost"
                type="button"
                className="absolute right-0 top-0 h-full"
                onClick={handleToggle}
            >
                {isVisible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
        </div>
    );
});
PasswordInput.displayName = 'Password Input';

export { PasswordInput };

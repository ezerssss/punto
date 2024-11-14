'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginFormSchema, LoginFormType } from '../schemas/forms/login';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useLogin from '../hooks/useLogin';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function Content() {
    const router = useRouter();
    const { isLoading, logIn } = useLogin(() => router.push('/'));

    const form = useForm<LoginFormType>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: '',
            password: '',
        },
        disabled: isLoading,
    });

    async function onSubmit(values: LoginFormType) {
        await logIn(values);
    }

    return (
        <main>
            <Card className="mx-auto w-full max-w-[400px]">
                <CardHeader className="flex justify-center text-center">
                    <h3 className="text-3xl">👋</h3>
                    <CardTitle>Nice to see you!</CardTitle>
                    <CardDescription>Let&apos;s get you in</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Input email"
                                                    type="email"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Input password"
                                                    type="password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="mt-8"
                            >
                                {isLoading ? (
                                    <Loader2Icon className="animate-spin" />
                                ) : (
                                    'Login'
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </main>
    );
}

// NEXTJS SHENANIGANS KILL ME
function LoginPage() {
    return (
        <Suspense>
            <Content />
        </Suspense>
    );
}

export default LoginPage;

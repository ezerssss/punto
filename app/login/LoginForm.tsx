'use client';

import React from 'react';
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
import useLogin from '../hooks/useLogin';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '@/components/ui/password_input';
import PuntoFullLogo from '@/components/PuntoFullLogo';

function LoginForm() {
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
        <div className="flex-1 bg-white">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex h-full flex-col justify-center gap-4 px-8 sm:px-16 md:px-20 lg:px-10 xl:px-14"
                >
                    <div className="mb-4 block min-[1000px]:hidden">
                        <PuntoFullLogo className="mx-auto" />
                        <p className="mt-3 text-center text-sm text-gray-400">
                            Start tracking your customer rewards journey.
                        </p>
                    </div>
                    <h1 className="mb-4 hidden text-xl min-[1000px]:block lg:text-2xl xl:text-3xl">
                        Sign in to Punto
                    </h1>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
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
                                    <PasswordInput
                                        placeholder="6+ Characters"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button disabled={isLoading} className="py-5" type="submit">
                        {isLoading ? (
                            <Loader2Icon className="animate-spin" />
                        ) : (
                            'Sign in'
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default LoginForm;

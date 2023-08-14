'use client';
import { Button } from "@/components/common/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/common/form"
import { Input } from "@/components/common/input"
import { Card, CardContent } from "@/components/common/card"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/api/supabase-client"
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50)
})

const Login = () => {
    const { push } = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const {
                data: { user, session },
                error
            } = await supabase.auth.signInWithPassword({ ...values });
            console.log('login', user, session, error)
            push('/');
        } catch (error) {
            console.log("login error", error);
        }
    }

    return (
        <div className="flex-1 flex justify-center flex-col items-center">
            <h1 className="text-4xl font-medium text-center">Welcome back</h1>
            <h2 className="desc text-sm">Welcome back! Please enter your details.</h2>
            <Card className="w-[380px] mt-8">
                <CardContent className="py-12">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter your email" {...field} />
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
                                            <Input placeholder="••••••••" type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <a href="#" className="text-indigo-500 font-medium text-sm !mt-4 flex justify-end">Forgot password?</a>
                            <Button className="w-[100%]">Sign in</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <p className="text-center mt-4">Don't have an account? <a href="/register" className="text-indigo-500 hover:text-indigo-700 font-medium">Sign up</a></p>
        </div>
    )
}

export default Login

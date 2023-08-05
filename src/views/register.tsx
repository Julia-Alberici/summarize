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
import { Card, CardHeader, CardContent, CardFooter } from "@/components/common/card"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { supabase } from "@/api/supabase-client"
import { Plan } from "@/tokens"

const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(2).max(50),
    confirmPassword: z.string().min(2).max(50)
})


const Register = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        supabase.auth.signUp({ email: values.email, password: values.password })
            .then((res) => {
                console.log(res);
                const { data, error } = res;
                if (error) {
                    console.log(error);
                }
                if (data.user) {
                    supabase.from('users').insert([{ id: data.user.id, plan: Plan.Starter }]);
                }
            })
            .catch((err) => {
                console.error(err);
            }).finally(() => {
                setIsLoading(false);
            });

    }

    return (
        <div className="flex-1 flex justify-center flex-col items-center">
            <h1 className="text-4xl font-medium text-center">Let's create your account</h1>
            <h2 className="desc text-sm">Sign up to start summarize articles for free.</h2>
            <Card className="w-[380px] mt-8">
                <CardHeader>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Email</FormLabel>
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
                                        <FormLabel required>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel required>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-[100%]" type="submit">Sign up</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                </CardFooter>
            </Card>
            <p className="text-center mt-4">Already have an account? <a href="/login" className="text-indigo-500 hover:text-indigo-700 font-medium">Sign in</a></p>
        </div>
    )
}

export default Register
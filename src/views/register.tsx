import { Button } from "@/components/common/button"
import {
    Form,
    FormField,
    FormInput,
} from "@/components/common/form"
import { Card, CardContent } from "@/components/common/card"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { supabase } from "@/api/supabase-client"
import { Plan } from "@/tokens"
import VerifyEmail from "./verify-email"
import { useState } from "react"

const formSchema = z.object({
    email: z.string().min(1, { message: "Email is required" }).email({
        message: "Must be a valid email",
    }),
    password: z.string().min(8, "Password must be at least 8 characters")
})


const Register = () => {
    const [confirmationSent, setConfirmationSent] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const authResponse = await supabase.auth.signUp({ email: values.email, password: values.password, options: { data: { plan: Plan.Starter } } })
            const { data, error } = authResponse;
            if (error) {
                console.error(error);
            }
            if (data.user) {
                const emailAccountExists = data.user.identities?.length === 0;
                if (emailAccountExists) {
                    form.setError('email', { message: 'An account with this email already exists' });
                    return;
                }
                setConfirmationSent(true);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="flex-1 flex justify-center flex-col items-center">
            <h1 className="text-4xl font-medium text-center">Let's create your account</h1>
            <h2 className="desc text-sm">Sign up to start summarize articles for free.</h2>
            <Card className="w-[380px] mt-8">
                <CardContent className="py-12">
                    {!confirmationSent
                        ? <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormInput required label="Email" placeholder="you@example.com" type="email" {...field} />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormInput required label="Password" placeholder="••••••••" type="password" {...field} />
                                    )}
                                />
                                <Button disabled={!form.formState.isValid || form.formState.isSubmitting} className="w-[100%]" type="submit">Sign up</Button>
                            </form>
                        </Form>
                        : <VerifyEmail />
                    }
                </CardContent>
            </Card>
            <p className="text-center mt-4">Already have an account? <a href="/login" className="text-indigo-500 hover:text-indigo-700 font-medium">Sign in</a></p>
        </div>
    )
}

export default Register
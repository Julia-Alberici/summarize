import { CheckCircledIcon } from "@radix-ui/react-icons"

const VerifyEmail = () => {

    return (
        <div className="mx-auto text-center">
            <CheckCircledIcon className="w-16 h-16 mx-auto text-green-600" />
            <h1 className="text-green-600 text-[28px] font-bold mb-2">Check your email to confirm</h1>
            <p className="text-green-500 text-xs">You've successfully signed up. Please check your email to confirm your account before signing in.</p>
        </div>
    )
}

export default VerifyEmail
"use client";
import Summarizer from '@/components/summarizer'
import Hero from '@/components/hero'
import { useAuth } from '@/contexts/auth-provider';
import { Button } from '@/components/common/button';
import { useRouter } from 'next/navigation';

export default function Page() {
    const { user } = useAuth();
    const { push } = useRouter();

    return (
        <>
            <Hero />
            {user
                ? <Summarizer />
                : <div className="w-full flex justify-center"><Button onClick={() => push('/register')}>Get Started</Button></div>
            }
        </>
    )
}
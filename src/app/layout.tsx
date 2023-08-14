import './global.css'
import Navigation from "@/components/navigation/navigation"
import { Metadata } from "next"
import { ArticleProvider } from "@/contexts/article-provider"
import AuthProvider from '@/contexts/auth-provider'

export const metadata: Metadata = {
    title: 'OpenAI Article Summarizer',
    description: 'My App is a...',
}

function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head />
            <body>
                <main>
                    <ArticleProvider>
                        <AuthProvider>
                            <div className="main">
                                <div className="gradient" />
                            </div>

                            <div className="app">
                                <Navigation />
                                <section className="mt-28 w-full max-w-xl">
                                    {children}
                                </section>
                            </div>
                        </AuthProvider>
                    </ArticleProvider>
                </main>
            </body>
        </html>
    )
}

export default RootLayout;
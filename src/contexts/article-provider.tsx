'use client'
import React, { createContext, useContext, useState } from 'react';

const ArticleContext = createContext({ summary: '', getArticleSummary: async (articleUrl: string) => ({} as any), error: {} as any, isFetching: false });

export const useArticleContext = () => useContext(ArticleContext);

export interface IArticleProviderProps {
    children: React.ReactNode;
}

export const ArticleProvider = (props: IArticleProviderProps) => {
    const [summary, setSummary] = useState('');
    const [error, setError] = useState<any>();
    const [isFetching, setIsFetching] = useState(false);

    const getArticleSummary = async (articleUrl: string) => {
        try {
            setIsFetching(true);
            const headers = new Headers();
            headers.set('X-RapidAPI-Key', process.env.NEXT_PUBLIC_RAPID_API_ARTICLE_KEY || '');
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            const response = await fetch(
                `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeURIComponent(articleUrl)}&length=3`,
                {
                    method: 'GET',
                    headers: headers,
                }
            );
            const data = await response.json();
            setSummary(data.summary); // Update the state with the fetched summary
            return data;
        } catch (error: any) {
            console.error('Error fetching article summary:', error);
            setError(error);
        } finally {
            setIsFetching(false);
        }
    };

    return (
        <ArticleContext.Provider value={{ summary, getArticleSummary, error, isFetching }}>
            {props.children}
        </ArticleContext.Provider>
    );
};


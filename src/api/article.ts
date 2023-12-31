import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const rapidApiKey = process.env.NEXT_RAPID_API_ARTICLE_KEY;

//docs https://rapidapi.com/restyler/api/article-extractor-and-summarizer
export const articleApi = createApi({
    reducerPath: "articleApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
        prepareHeaders(headers) {
            headers.set("X-RapidAPI-Key", rapidApiKey);
            headers.set(
                "X-RapidAPI-Host",
                "article-extractor-and-summarizer.p.rapidapi.com"
            );

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) =>
                `summarize?url=${encodeURIComponent(
                    params.articleUrl
                )}&length=3`,
        }),
    }),
});

export const { useLazyGetSummaryQuery } = articleApi;

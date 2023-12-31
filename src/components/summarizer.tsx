'use client'
import { useState, useEffect } from 'react'

import { loader } from '@/assets';
import { Button } from "@/components/common/button";
import { CheckIcon, CopyIcon, Link1Icon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { useArticleContext } from '@/contexts/article-provider';
import Image from 'next/image';

export interface IArticle {
  url: string;
  summary: string;
}

const Summarizer = () => {
  const [article, setArticle] = useState<IArticle>({
    url: '',
    summary: ''
  })
  const [allArticles, setAllArticles] = useState<IArticle[]>([])
  const { getArticleSummary, error, isFetching } = useArticleContext();
  const [copied, setCopied] = useState('')

  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem('articles');
    if (!articlesFromLocalStorage) return;

    setAllArticles(JSON.parse(articlesFromLocalStorage))
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = await getArticleSummary(article.url);

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [...allArticles, newArticle];
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl: string) => {
    setCopied(copyUrl)
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => setCopied(''), 2000);
  }

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
          <Link1Icon className='absolute left-0 my-2 ml-3 w-5' />
          <input type="url" placeholder='Enter a URL' value={article.url} onChange={e => setArticle({ ...article, url: e.target.value })} required className='url_input peer' />
          <Button variant="outline" type="submit" size="icon" className='submit_btn'>
            <PaperPlaneIcon />
          </Button>
        </form>
        {/* Browse URL History */}
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((article, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(article)} className="link_card">
              <div className="copy_btn" onClick={() => handleCopy(article.url)}>
                {copied === article.url
                  ? <CheckIcon className='w-[40%] h-[40%] object-contain' />
                  : <CopyIcon className='w-[40%] h-[40%] object-contain' />}
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {article.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <Image src={loader} alt="loader" width={80} height={80} />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, this wasn't supposed to happen..
            {'status' in error && 'message' in (error.data as any) &&
              <>
                <br />
                <span className="font-satoshi font-normal text-gray-700">
                  {(error.data as any).message}
                </span>
              </>
            }
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-lg">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">{article.summary}</p>
              </div>
            </div>
          )
        )

        }

      </div>
    </>
  )
}

export default Summarizer
import { IRedditPost } from '@/typings';
import React, { useEffect, useState } from 'react';
import Button from '../Button';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CloseIcon } from '../Icons';


export default function TextPost({ post }: { post: IRedditPost }) {
  const { selftext } = post
  const [showMore, setShowMore] = useState(true);
  const [height, setHeight] = useState<number | string>('');
  const [dimStyle, setDimStyle] = useState('opacity-100');
  const [tldr, setTldr] = useState('')
  useEffect(() => {
    summarizedText().then(data => setTldr(data.summary.toString()))
  }, [])
  const summarizedText = async () => {
    const res = await fetch('/api/summary', { 
      method: 'POST', 
      body: JSON.stringify(post.selftext) })
    const data = await res.json()
    return data
  
  }
  const handleBodyOverflow = () => document.body.style.overflow === '' ? document.body.style.overflow = 'hidden' : document.body.style.overflow = '' 
  const handleShowMore = () => {
    
    if (height === '') {
      setHeight('fit');
      setShowMore(false);
      return;
    }
    setHeight('');
    setShowMore(true);
    return;
  };

  const handleMouseLeave = () => {
    if (showMore) {
      setDimStyle('opacity-100');
    }
    if (!showMore) {
      setDimStyle('opacity-20 hover:opacity-100');
    }
  };
  //handles md posts
  if(post.author_flair_type === 'richtext') 
  return (
    <div 
    style={{ maxWidth: 440 }}
    className={`min-w-full  ${showMore ? 'overflow-hidden' : 'overflow-y-scroll'}`}>
      <div className={`h-72 ${showMore ? '' : 'bg-gray-50 fixed top-0 left-1/2 transform -translate-x-1/2 -translate-y-1 z-10 overflow-y-scroll h-screen w-screen'}`}>
        <div className=' bg-white shadow w-full p-4  md:w-fit md:p-4 h-fit mx-auto '>
          <Button    
           className={ ` ${showMore ? ' hidden' : ' block'}`}
            onMouseLeave={handleMouseLeave}
            onClick={() => {handleShowMore(), handleBodyOverflow()}}
            variant='secondary'><CloseIcon fill='#3b83f6'/></Button>
          <ReactMarkdown className='text-xs md:text-base' remarkPlugins={[remarkGfm]}>{(post.selftext as string)}</ReactMarkdown>
        
        </div>
      </div>
      <div className='w-full h-20 bg-gradient-to-b from-transparent to-gray-50 relative flex justify-center items-end'>
        <Button
              className={dimStyle}
              onMouseLeave={handleMouseLeave}
              onClick={() => {handleShowMore(), handleBodyOverflow()}}
              variant='secondary'
            >
            Expand View
            </Button>
      </div>
    </div>
  )


  return (
    <div
      // initial height  = h-36
      style={{ minHeight: 144 }}                                  //prevents text overlap with button
      className='min-w-full text-sm relative whitespace-normal break-words pb-12 text-justify leading-loose'
    >
      {/* text post */}
        {showMore ? <p>{tldr}</p> : 
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{(post.selftext as string)}</ReactMarkdown>}

        <div
      
          className={`w-full h-36 absolute bottom-0 flex items-end justify-center`}
        >
          <Button
            className={dimStyle}
            onMouseLeave={handleMouseLeave}
            onClick={handleShowMore}
            variant='secondary'
          >
            {showMore ? 'show more' : 'show less'}
          </Button>
        </div>
    </div>
  );
}

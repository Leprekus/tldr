import { IRedditPost } from '@/typings';
import React, { useState } from 'react';
import Button from '../Button';

export default function TextPost({ text }: { text: string }) {
  const [showMore, setShowMore] = useState(true);
  const [height, setHeight] = useState<number | string>('');
  const [dimStyle, setDimStyle] = useState('opacity-100');

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

  return (
    <div
      // initial height  = h-36
      style={{ minHeight: 144 }}                                  //prevents text overlap with button
      className={`min-w-full text-sm relative whitespace-normal break-words ${!showMore && 'pb-12'}` }
    >
      {/* text post */}
        {showMore ? <p>tldr;</p> : <p>{text}</p>}

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

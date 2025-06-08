import React from 'react'
import NavbarWthSearch from '../components/NavbarWthSearch'
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


export default function PostDetail() {
    const location = useLocation();
    const post = location.state;

    function sentimentColor(str) {
        if (str == "positive") {
        return 'bg-green-200';
        } else if (str == "neutral"){
        return 'bg-gray-200';
        } else {
        return 'bg-red-200';
        }
    }

  return (
    <>
          <div>
            <NavbarWthSearch />
          </div>
          <div className='flex justify-center p-10'>
            <div className='flex flex-wrap gap-1 bg-amber-100 rounded-4xl p-5
                        border-2 shadow shadow-cyan-200 w-full h-screen'>
                <div className='flex flex-col font-semibold w-full h-full'>
                    <div className='h-auto bg-white border-2 rounded-b-none px-12 p-7 rounded-4xl shadow-2xl
                                    text-4xl'>
                        <div className='pb-5'>
                            {post.title}
                        </div>
                        <div className='flex justify-between text-sm'>
                            <div className='bg-blue-500 border-2 rounded-4xl p-2 px-5'>
                                <a  href ={`${post.url}`} className='underline text-white font-bold'>
                                By {post.author}
                                </a>
                            </div>
                            <div className={`${sentimentColor(post.sentiment)} border-2 rounded-4xl p-2 px-5`}>
                                <div>
                                    Sentiment - {post.sentiment}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 bg-white border-2 border-t-0 rounded-t-none ps-8 p-5 rounded-4xl shadow-2xl
                                    h-max text-justify '>
                        <ReactMarkdown>
                            {post.description}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

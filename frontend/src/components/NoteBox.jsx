import React from 'react'
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom'


export default function NoteBox({post}) {
  const navigate = useNavigate();

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + '...';
  }

  function sentimentColor(str) {
    if (str == "positive") {
      return 'bg-green-200';
    } else if (str == "neutral"){
      return 'bg-gray-200';
    } else {
      return 'bg-red-200';
    }
  }
  function handleClick() {
    navigate(`/Stock/${post.id}`, { state: post });
  }

  return (
    <div onClick={handleClick}
    className={`flex flex-col w-1/2 h-auto p-3 pt-0 cursor-pointer`}>
        <h1 className={`${sentimentColor(post.sentiment)} border-2 border-b-0 rounded-b-none ps-5 p-3 rounded-4xl shadow-2xl font-semibold`}>
            {post.title}
        </h1>
        <div className={`flex-1 bg-white border-2 rounded-t-none p-3 rounded-4xl shadow-2xl
                        ${post.description != "" ? 'opacity-100 scale-100 max-h-screen' : ' max-h-10 overflow-hidden'}`}
        >
            <ReactMarkdown>
              {truncateString(post.description, 330)}
            </ReactMarkdown>
        </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import NavbarWthSearch from '../components/NavbarWthSearch'
import NoteBox from '../components/NoteBox'
import api from "../api.js";
import { useParams } from 'react-router-dom';
import Lottie from "lottie-react";
import stockGrowth from "../assets/loadingAnimation.json";



export default function StockInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const [newsSectionVisibility, setNewsSectionVisibility] = useState(null)
  const { stockName } = useParams();
  const [loading, setLoading] = useState(true);
  const [redditPosts, setRedditPosts] = useState([]);
  const [marketNews, setMarketNews] = useState([]);
  const [stockNews, setStockNews] = useState([]);
  const [peers, setPeers] = useState([]);

  const fetchPosts = async () => {
    setLoading(true); // start loading
    try {
      const response = await api.get('/' + stockName);
      setRedditPosts(response.data['Reddit_Posts']);
      setMarketNews(response.data['Market_News']);
      setStockNews(response.data['Stock_News']);
      setPeers(response.data['Peer_Companies']);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts", error);
      setLoading(true)
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [stockName]);

  return (
    <>
      <div>
        <NavbarWthSearch />
      </div>
      <div className='flex justify-center p-10 min-h-screen max-h-fit'>
        <div className='flex1 flex-wrap gap-1 bg-amber-100 rounded-4xl p-5
                    border-2 shadow shadow-cyan-200 w-full'>
          <div className='p-3 w-full'>
            <div className='pl-7'>
              <h1 className='font-sans px-5 py-2 rounded-4xl rounded-b-none border-2 border-b-0 w-fit'>
                Online Sentiment
              </h1>
            </div>
            <div className='border-2 p-5 pb-3  rounded-4xl w-full'>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className={`bg-white rounded-4xl p-4 px-8 border-2 cursor-pointer w-full duration-300
                  ${loading ? `animate-pulse` : `animate-none`}`}
              >
                Reddit
              </div>
            </div>
          </div>

          <div className={`flex flex-wrap w-full  transition-all duration-1200 ease-in-out
                        ${(isOpen && !loading)? 'opacity-100 scale-100 max-h-screen' : 'opacity-0 scale-95 max-h-0 overflow-hidden'}`}
          >
            {redditPosts.map((post) => (
              <NoteBox key={post.id} post={post} />
            ))}
          </div>
          <div className='p-3 w-full'>
            <div className='pl-7'>
              <h1 className='font-sans px-5 py-2 rounded-4xl rounded-b-none border-2 border-b-0 w-fit'>
                News
              </h1>
            </div>
            <div className='flex border-2 p-5 pb-3  rounded-4xl w-full'>
              <div onClick={() => newsSectionVisibility === 'market'? setNewsSectionVisibility('none'): setNewsSectionVisibility("market")}
                className={`bg-white rounded-4xl p-4 mx-2 px-6 border-2 cursor-pointer w-full duration-300
                ${loading ? `animate-pulse` : `animate-none`}`}
              >
                Stock News
              </div>
              <div onClick={() => newsSectionVisibility === 'stock'? setNewsSectionVisibility('none'): setNewsSectionVisibility("stock")}
                className={`bg-white rounded-4xl p-4 mx-2 px-6 border-2 cursor-pointer w-full duration-300
                ${loading ? `animate-pulse` : `animate-none`}`}
              >
                Market News
              </div>
            </div>
          </div>
          <div className={`flex flex-wrap w-full transition-all duration-700 ease-in-out'
                        ${(newsSectionVisibility === 'market' && !loading)? 'opacity-100 scale-100 max-h-screen' : 'opacity-0 scale-95 max-h-0 overflow-hidden'}`}>
            {marketNews.slice(0, 4).map((post) => (
              <NoteBox key={post.id} post={post} />
            ))}
          </div>
          <div className={`flex flex-wrap w-full transition-all duration-700 ease-in-out'
                        ${(newsSectionVisibility === 'stock' && !loading)? 'opacity-100 scale-100 max-h-screen' : 'opacity-0 scale-95 max-h-0 overflow-hidden'}`}>
            {stockNews.slice(0, 4).map((post) => (
                <NoteBox key={post.id} post={post} />
              ))}
            </div>
          <div className='p-3 w-full'>
            <div className='pl-7'>
              <h1 className='font-sans px-5 py-2 rounded-4xl rounded-b-none border-2 border-b-0 w-fit'>
                Subindustries of this company
              </h1>
            </div>
            
            <div className='flex flex1 flex-wrap justify-center border-2 p-5 pb-3  rounded-4xl w-full '>
              {loading? 
                (<Lottie animationData={stockGrowth} 
                        loop={true} 
                        style={{ height: 400, width: 300 }}
                  />) :
              (peers.map((peer, index) =>(
                <div key={index}
                className={`bg-white rounded-4xl p-4 m-1 px-6 border-2 cursor-pointer min-w-fit w-1/5 duration-300`}
                  >
                    {peer}
                </div>
              )))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import uvicorn
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from controllers.controller import get_Processed_Stock_News, get_Processed_Market_News, getProcessedRedditPosts, get_Peers

class Post(BaseModel):
    id: str = ""
    title: str
    description: str = ""
    author: str = ""
    url: str = ""
    sentiment: str
    score: float

class Posts(BaseModel):
    Reddit_Posts: List[Post]
    Market_News: List[Post]
    Stock_News: List[Post]
    Peer_Companies: List[str]
    
app = FastAPI(debug=True)


origins = [
    "http://localhost:5173",
    # Add more origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/{Stock}", response_model=Posts)
def get_StockInfo(Stock:str):
    reddit_posts = []
    posts = getProcessedRedditPosts(Stock)
    for post in posts:
        reddit_posts.append(Post(
            id= post.id,
            title=post.title,
            description=post.description,
            author=post.author,
            url=post.url,
            sentiment=post.sentiment,
            score=post.score
            ))
    market_news = []
    posts = get_Processed_Market_News()
    for post in posts:
        market_news.append(Post(
            id= post.id,
            title=post.title,
            description=post.description,
            author=post.source,
            url=post.url,
            sentiment=post.sentiment,
            score=post.score
            ))
    stock_news = []
    posts = get_Processed_Stock_News(Stock)
    for post in posts:
        stock_news.append(Post(
            id= post.id,
            title=post.title,
            description=post.description,
            author=post.source,
            url=post.url,
            sentiment=post.sentiment,
            score=post.score
            ))
    peers = get_Peers(Stock)
    return Posts(Reddit_Posts=reddit_posts,
                 Market_News=market_news,
                 Stock_News=stock_news,
                 Peer_Companies=peers
                 )

stocks = []



if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
    
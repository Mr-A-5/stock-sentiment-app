from services.reddit_scrapper import getNews
from services.sentiment_analyzer import getSentiment
from services.companyProfile import *
from typing import List


def getProcessedRedditPosts(company:str):
    post_list = getNews(company)
    for post in post_list:
        if post.description is None or post.description == "" or len(post.description) > 500:
            sentiment = getSentiment(post.title)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
        else:
            sentiment = getSentiment(post.description)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
    sorted_posts = sorted(post_list, key=lambda x: x.description == "")
    return sorted_posts

def get_Processed_Market_News() -> List[NewsPost]:
    post_list = get_Market_News()[0:25]
    for post in post_list:
        if (len(post.title) + len(post.description) > 500):
            sentiment = getSentiment(post.title)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
        else: 
            sentiment = getSentiment(post.title + ". Summary: " + post.description)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
    return post_list

def get_Processed_Stock_News(company:str) -> List[NewsPost]:
    post_list = get_Stock_News(company)
    for post in post_list:
        if (len(post.title) + len(post.description) > 500):
            sentiment = getSentiment(post.title)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
        else:
            sentiment = getSentiment(post.title + ". Summary: " + post.description)
            post.sentiment = sentiment[0]['label']
            post.score = sentiment[0]['score']
    return post_list

def get_Peers(company:str) -> List[str]:
    return get_Peer_Companies(company)


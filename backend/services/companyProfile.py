import finnhub
from config.config import FINHUB_KEY
from datetime import date
from models.NewsPost import NewsPost
from typing import List

finnhub_client = finnhub.Client(api_key=FINHUB_KEY)

def get_US_Stock_List() -> list:
    return finnhub_client.stock_symbols('US') 

#Finhub Market News
def get_Market_News() -> List[NewsPost]:
    lst = finnhub_client.general_news('general', min_id=7485718)
    post_lst = []
    for post in lst:
        post_lst.append(NewsPost(f"{post["id"]}",
                             post['headline'],
                             post['source'],
                             post['summary'],
                             post['url']
                             ))
    return post_lst
     

def get_News_Range() -> tuple[str, str]:
    today = date.today()
    return today, today

#Finhub Company News
def get_Stock_News(Stock:str) -> List[NewsPost]:
    start, finish = get_News_Range()
    lst = finnhub_client.company_news(Stock, _from=start, to=finish)
    post_lst = []
    for post in lst:
        post_lst.append(NewsPost(f"{post["id"]}",
                             post['headline'],
                             post['source'],
                             post['summary'],
                             post['url']
                             ))
    return post_lst
def get_Peer_Companies(Stock:str) -> list:
    lst = finnhub_client.company_peers(Stock)
    if Stock in lst:
        lst.remove(Stock)
    return lst
import praw
from config.config import CLIENT_ID, CLIENT_SECRET, USER_AGENT
from models.RedditPost import RedditPost

def getNews(company:str)-> list[RedditPost]:
    lst = []
    reddit = praw.Reddit(client_id = CLIENT_ID,
                        client_secret = CLIENT_SECRET,
                        user_agent = USER_AGENT)

    for submission in reddit.subreddit('all').search(f"{company} Stock", limit=4):
        lst.append(RedditPost(submission.id, submission.title, submission.selftext,submission.author.name,submission.url))
    return lst

    
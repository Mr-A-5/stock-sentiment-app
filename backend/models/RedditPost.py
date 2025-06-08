from dataclasses import dataclass
from typing import Optional

@dataclass
class RedditPost:
    id:str
    title: str
    description:  Optional[str] = ""
    author: Optional[str] = ""
    url: Optional[str] = ""
    sentiment: Optional[str] = ""
    score: Optional[float] = 0.0

from dataclasses import dataclass
from typing import Optional

@dataclass
class NewsPost:
    id:str
    title: str
    source: str
    description:  Optional[str] = ""
    url: Optional[str] = ""
    sentiment: Optional[str] = ""
    score: Optional[float] = 0.0

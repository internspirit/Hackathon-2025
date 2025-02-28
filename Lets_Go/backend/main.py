from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from firebase import add_journey, get_all_journeys

app = FastAPI()

# Pydantic Model for Topic
class JourneySchema(BaseModel):
    name: str
    difficulty: str

# Endpoint: Get all topics
@app.get("/journeys/", response_model=List[JourneySchema])
def fetch_topics():
    journeys = get_all_journeys()
    return journeys

# Endpoint: Add a new topic
@app.post("/journey/", response_model=JourneySchema)
def create_topic(topic: JourneySchema):
    new_journey = add_journey(topic.name, topic.difficulty)
    if not new_journey:
        raise HTTPException(status_code=400, detail="Failed to add topic")
    return new_journey


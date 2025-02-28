from app.database.firebase import FirebaseDB
from app.models.schemas import JourneySchema
from app.services.ai_services import EDAI
import uuid
class JourneyService:

    def __init__(self, db: FirebaseDB):
        self.db = db
        self.ai = EDAI()

    async def get_all_journeys(self) -> list:
        return await self.db.get_all_documents("journey")
    
    async def get_journey(self, journey_id: str) -> JourneySchema:
        return await self.db.get_document("journey", journey_id)
    
    #get the journey by user user_id 
    async def get_user_journeys(self, user_id: str) -> list:
        all_journeys = await self.db.get_all_documents("journey")
        user_journeys = []
        for journey in all_journeys:
            if user_id in journey["users"]:
                user_journeys.append(journey)
        return user_journeys

    async def create_journey(self, journey: JourneySchema) -> JourneySchema:
        journey_id = str(uuid.uuid4())  # Generate a random ID
        journey.j_id = journey_id
        journey.pathway = self.ai.generate_pathway(course_name=journey.name, difficulty=journey.difficulty)
        await self.db.create_document("journey", journey_id, journey.dict())
        return {"message": "Journey created successfully"}
    
    
    

    
    
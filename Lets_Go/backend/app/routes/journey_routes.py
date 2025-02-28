from fastapi import APIRouter, Depends
from app.services.journey_service import JourneyService
from app.models.schemas import JourneySchema
from app.database.firebase import FirebaseDB

router = APIRouter()

def get_journey_service():
    return JourneyService(FirebaseDB())

@router.get("/journey")
async def get_journeys(journey_service: JourneyService = Depends(get_journey_service)):   
    return await journey_service.get_all_journeys()

@router.get("/journey/{journey_id}")
async def get_journey(journey_id: str, journey_service: JourneyService = Depends(get_journey_service)):
    return await journey_service.get_journey(journey_id)

@router.post("/journey")
async def create_journey(journey: JourneySchema, journey_service: JourneyService = Depends(get_journey_service)):
    
    return await journey_service.create_journey(journey)


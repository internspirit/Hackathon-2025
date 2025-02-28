from fastapi import FastAPI
from app.routes import journey_routes
from app.config.firebase_config import init_firebase

# Initialize Firebase
init_firebase()

# Create FastAPI app
app = FastAPI(
    title="Ed-Venture API",
    description="API for managing Journeys, Modules and ",
    version="1.0.0"
)

# Include routers
app.include_router(journey_routes.router, prefix="/edventure", tags=["journeys"])

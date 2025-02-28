from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import date
from enum import Enum
from decimal import Decimal


# Define enum for difficulty levels
class DifficultyLevel(str, Enum):
    BASIC = "BASIC"
    INTERMEDIATE = "INTERMEDIATE"
    ADVANCED = "ADVANCED"

# Define module structure for pathway
class Module(BaseModel):
    heading: str = Field(description="Main topic of the module")
    sub_headings: List[str] = Field(description="List of 3-5 essential subtopics")


class CoursePathway(BaseModel):
    modules: List[Module] = Field(description="List of modules making up the course pathway")
# Define the Journey schema

# Define the Journey schema
class JourneySchema(BaseModel):
    # Required fields
    name: str = Field(description="Name of the learning journey")
    difficulty: DifficultyLevel = Field(description="Difficulty level of the journey")
    
    # Optional fields
    pathway: Optional[dict] = Field(None, description="List of modules making up the journey pathway")
    progress: Optional[Decimal] = Field(None, description="Progress percentage (0.00-100.00)")
    completed_modules: Optional[int] = Field(None, description="Number of completed modules")
    start_date: Optional[date] = Field(None, description="Start date of the journey")
    end_date: Optional[date] = Field(None, description="Expected end date of the journey")
    summary: Optional[str] = Field(None, description="AI-generated story-like summary of the journey")
    user_id: Optional[str] = Field(None, description="User ID associated with the journey")
    j_id: Optional[str] = Field(None, description="Unique ID of the journey")
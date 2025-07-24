
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from engine import calculate_hand_vs_range_equity

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://plo-equity-calcuator.vercel.app",
    "https://*-mrmoglins-projects.vercel.app",   
    
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allow all methods (GET, POST, etc.)
    allow_headers=["*"], # Allow all headers
)

@app.get("/")
def health_check():
    return {"status": "healthy"}

# Define the request model to accept both hero hand and villain range
class EquityRequest(BaseModel):
    hero_hand: str
    villain_range_percent: int

@app.post("/api/calculate-equity")
async def calculate_equity_endpoint(request: EquityRequest):
    """
    API endpoint to calculate hand vs. range equity.
    """
    equity = calculate_hand_vs_range_equity(
        request.hero_hand,
        request.villain_range_percent
    )
    
    # Return a structured JSON response
    return {
        "hero_hand": request.hero_hand,
        "villain_range_percent": request.villain_range_percent,
        "equity": f"{equity:.2f}%"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from engine import get_equity_vs_random



# Create the FastAPI application object
app = FastAPI()

# Define the structure of the incoming request data
class HandRequest(BaseModel):
    hero_hand: str

# Define your API endpoint
@app.post("/api/calculate-equity")
async def calculate_equity_endpoint(request: HandRequest):
    """
    API endpoint to calculate the equity of a hero's hand against a random hand.
    """
    # Call your existing engine function with the hand from the request
    # Note: We are not using parallel processing here for simplicity in the API
    equity = get_equity_vs_random(request.hero_hand)
    
    # Return the results in a JSON response
    return {
        "hero_hand": request.hero_hand,
        "equity_vs_random": f"{equity:.2f}%",
        "simulation_count": 2000 # Or whatever your engine's default is
    }

# This part allows us to run the server directly for testing
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

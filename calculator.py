from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from pathlib import Path
import os
import json

app = FastAPI(title="Calculator API")

# Mount static files
static_dir = Path(__file__).parent / "static"
if static_dir.exists():
    app.mount("/", StaticFiles(directory=str(static_dir), html=True), name="static")

class CalculatorRequest(BaseModel):
    expression: str

class CalculatorResponses(BaseModel):
    result: float
    error: str = None

@app.post("/api/calc")
async def calculate(request: CalculatorRequest):
    """
    Calculate a mathematical expression.
    Example: {"expression": "2 + 2 * 3"}
    """
    try:
        # Use eval with restricted namespace for safety
        result = eval(request.expression, {"__builtins__": {}}, {})
        if isinstance(result, (int, float)):
            return CalculatorResponses(result=float(result), error=None)
        else:
            return CalculatorResponses(result=None, error="Expression must return a number")
    except Exception as e:
        return CalculatorResponses(result=None, error=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
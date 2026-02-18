SECRET_KEY = "supersecretkey123"  # Use a strong secret in production
ALGORITHM = "HS256"
COOKIE_NAME = "access_token"
from fastapi import FastAPI,Response,Cookie,Request,Depends
from pydantic import BaseModel
from typing import List
import uvicorn,jwt,datetime
import sys
from .ai_agent import get_response_from_ai_agent
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import json, os
from .groq_client import call_groq_ai  # we create this next

app=FastAPI(title="ZenMind:AI Chatbot")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class messagesItem(BaseModel):
    role: str   # "user" or "ai"
    text: str

class RequestState(BaseModel):
  model_name: str
  model_provider: str
  system_prompt: str
  messages: List[messagesItem]
  allow_search: bool

class FoodLog(BaseModel):
    age: int
    weight: float
    height: float
    diet_type: str
    activity_level: str
    goal: str
    allergies: List[str] = []
    logged_food: List[str]

class Config:
    json_schema_extra = {
      "example": {
        "model_name": "llama-3.3-70b-versatile",
        "model_provider": "Groq",
        "system_prompt": """
You are a friendly mental health support chatbot.When giving advice or suggestions, always: 
-word limit between 250-300 word. 
-Always use one newline per point (short lines)
-Use short, simple sentences.
-Include headings if necessary.
-give short paragraphs.
-Make it actionable and easy to read for someone feeling stressed or anxious.
-remove * and replace it to number 
- If the user mentions serious distress or crisis, suggest contacting a counsellor from college. 
""",
        "messages": ["Hello, I'm feeling anxious today"],
        "allow_search": False
      }
    }

ALLOWED_MODEL_NAMES=["llama-3.3-70b-versatile", "gpt-4o-mini"]
@app.post("/chat")
async def ask(request: RequestState):
    try:
        if request.model_name not in ALLOWED_MODEL_NAMES:
            return {"error": f"Invalid model name. Allowed models: {', '.join(ALLOWED_MODEL_NAMES)}"}

        if request.model_provider not in ["Groq", "OpenAI"]:
            return {"error": "Invalid provider. Allowed providers: Groq, OpenAI"}

        if not request.messages or len(request.messages) == 0:
            return {"error": "messages cannot be empty"}

        # Call AI with full history
        response = get_response_from_ai_agent(
            request.model_name,
            [m.dict() for m in request.messages],
            request.allow_search,
            request.system_prompt,
            request.model_provider
        )

        # Extract last user message
        last_user_msg = request.messages[-1].text.lower()

        # Detect "very bad" state
        crisis_keywords = ["suicidal", "end life", "hopeless", "kill myself", "worthless", "depressed","giving up"]
        if any(word in last_user_msg for word in crisis_keywords):
            response += (
                "\n\n⚠️ It sounds like you’re in a very difficult state. "
                "Please reach out to a professional counsellor. Here are some available in your college:\n"
                "1. Dr. Meera Sharma – Student Wellness Centre (meera@college.edu)\n"
                "2. Mr. Rajesh Kumar – Student Counselling Dept. (rajesh@college.edu)\n"
                "3. Ms. Ananya Verma – Peer Support Counsellor (ananya@college.edu)\n\n"
                "If you feel unsafe, please talk to someone you trust right away."
            )

        return {"response": response}

    except Exception as e:
        return {"error": f"Internal server error: {str(e)}"}

class UserLogin(BaseModel):
    username: str
    email: str | None = None
    phone: str | None = None
    institute: str | None = None

class AdminLogin(BaseModel):
    name: str
    email: str
    phone: str
    institute: str


def get_current_user(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        return None
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None
def calculate_nutrients(food_list):
    db_path = os.path.join(os.path.dirname(__file__), "data/food_db.json")

    with open(db_path) as f:
        food_db = json.load(f)

    total = {"calories": 0, "protein": 0, "carbs": 0, "fat": 0}

    for item in food_list:
        item = item.lower().strip()
        if item in food_db:
            for key in total:
                total[key] += food_db[item][key]

    return total
@app.post("/diet/recommend")
def diet_recommend(data: FoodLog):
    nutrients = calculate_nutrients(data.logged_food)
    foods_str = ", ".join(data.logged_food)

    prompt = f"""
You are a nutrition expert. Analyze the user's diet and health.
also suggest 3 tasty, creative, and healthier alternatives for the junk food item: "{data.logged_food}" in the Substitute part.
The user follows a {data.diet_type} diet.Make the alternatives appealing and realistic.
If the user is vegetarian, avoid non-veg items.
If the user is vegan, avoid all dairy and non-veg.
Respond as a JSON array of strings only.

User Profile:
Age: {data.age}
Weight: {data.weight}
Height: {data.height}
Diet: {data.diet_type}
Goal: {data.goal}
Activity Level: {data.activity_level}
Allergies: {data.allergies}

Today's Food Log:
{foods_str}

Nutrient Summary:
{nutrients}

Write the result in this friendly format (no JSON, no code blocks):
DO NOT use markdown, code blocks or \\n. Use actual new lines.
Use real line breaks between lines. The format must look exactly like this example:

🍽 Overview:
(short summary)

⚠️ Missing Nutrients:
- item
- item

🎯 Suggested Targets:
Calories: ___
Protein: ___
Carbs: ___
Fat: ___

🥗 Meal Plan:
Breakfast: ___  
Lunch: ___  
Dinner: ___  
Snacks: ___  

Substitutes:
-
-
-

🚫 Avoid:
- item
- item

💡 Motivation:
(one sentence encouragement)
"""


    
    import re

    def format_response(text: str) -> str:
        # Convert literal \n to actual line breaks
        formatted = text.replace("\\n", "\n").replace("\\t", " ")

        # Format numbered points (1., 2., 3.)
        formatted = re.sub(r"\s*(\d+)\.\s*", r"\n\1. ", formatted)

        # Format bullet points using •
        formatted = re.sub(r"-\s*", "• ", formatted)

        # Remove multiple blank lines
        formatted = re.sub(r"\n{3,}", "\n\n", formatted)

        # Remove Markdown code blocks if present
        formatted = formatted.replace("```", "")

        return formatted.strip()

    ai_result = call_groq_ai(prompt)
    cleaned = format_response(ai_result)

    return {
    "nutrients": nutrients,
    "ai_recommendation": cleaned
}
@app.post("/diet/substitute")
def get_substitutes(data: FoodLog):
    db_path = os.path.join(os.path.dirname(__file__), "data/food_db.json")
    with open(db_path) as f:
        food_db = json.load(f)

    healthy_substitutions = []

    for food in data.logged_food:
        food_lower = food.lower()
        if food_lower in food_db:
            entry = food_db[food_lower]
            
            # Tier scoring
            tier = "healthy" if entry["category"] in ["healthy", "protein", "dairy"] \
                   else "moderate" if entry["category"] in ["north indian","south indian"] \
                   else "junk"

            # Predefined substitutes if available
            better_options = entry.get("substitutes", [])

            # If no substitutes or want dynamic suggestions
            if not better_options:
                prompt = f"""
                    You are a nutritionist and chef. Suggest 3 tasty, creative, and healthier alternatives for the food item: "{food}".
                    The user follows a {data.diet_type} diet.
                    Make the alternatives appealing and realistic.
                    If the user is vegetarian, avoid non-veg items.
                    If the user is vegan, avoid all dairy and non-veg.
                    Respond as a JSON array of strings only.
                    """
                try:
                    ai_response = call_groq_ai(prompt)
                    better_options = json.loads(ai_response)
                except Exception as e:
                    better_options = ["No dynamic alternatives found"]

            healthy_substitutions.append({
                "food": food,
                "tier": tier,
                "reason": f"Category: {entry['category']}",
                "better_options": better_options
            })

    return {"healthy_substitutions": healthy_substitutions}





  


@app.post("/auth/user-login")
def user_login(user: UserLogin):
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode(
        {"username": user.username, "role": "user", "exp": exp.timestamp()},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    res = JSONResponse({"messages": f"User '{user.username}' logged in successfully!"})
    res.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )
    return res


@app.post("/auth/admin-login")
async def admin_login(admin: AdminLogin, response: Response):
    token = jwt.encode(
        {
            "admin": admin.name,   # Keep this for frontend redirect check
            "role": "admin",
            "exp": (datetime.datetime.utcnow() + datetime.timedelta(hours=12)).timestamp()
        },
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    res = JSONResponse({"messages": f"Counsellor '{admin.name}' logged in successfully!"})
    res.set_cookie(
        key=COOKIE_NAME,   
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )
    return res


@app.get("/auth/me")
def me(user: dict = Depends(get_current_user)):
    if not user:
        return {"authenticated": False, "data": None}

    if user.get("role") == "admin":
        return {
            "authenticated": True,
            "data": {
                "admin": True,            
                "name": user.get("admin"), 
                "exp": user.get("exp")
            }
        }

    return {
        "authenticated": True,
        "data": {
            "admin": False,            
            "username": user.get("username"),
            "exp": user.get("exp")
        }
    }


@app.post("/auth/logout")
def logout(response: Response):
    res = JSONResponse({"messages": "Logged out successfully"})
    res.delete_cookie(COOKIE_NAME,path="/")
    return res


if __name__=="__main__":
  uvicorn.run("main:app",host="localhost",port=8000,reload=True)
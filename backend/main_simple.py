SECRET_KEY = "supersecretkey123"  # Use a strong secret in production
ALGORITHM = "HS256"
COOKIE_NAME = "access_token"
from fastapi import FastAPI,Response,Cookie,Request,Depends
from pydantic import BaseModel
from typing import List
import uvicorn,jwt,datetime
import sys
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app=FastAPI(title="ZenMind:AI Chatbot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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


@app.post("/auth/user-login")
def user_login(user: UserLogin, response: Response):
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    token = jwt.encode(
        {"username": user.username, "role": "user", "exp": exp.timestamp()},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    response.set_cookie(
        key=COOKIE_NAME,
        value=token,
        httponly=True,
        samesite="lax",
        secure=False
    )
    return {"message": f"User '{user.username}' logged in successfully!"}


@app.post("/auth/admin-login")
def admin_login(admin: AdminLogin, response: Response):
    exp = datetime.datetime.utcnow() + datetime.timedelta(hours=12)
    token = jwt.encode(
        {"role": "admin", "name": admin.name, "exp": exp.timestamp()},
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    res = JSONResponse({"message": f"Counsellor '{admin.name}' logged in successfully!"})
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
        return {"authenticated": True, "data": {"admin": True, "name": user.get("name"), "exp": user.get("exp")}}
    return {"authenticated": True, "data": {"admin": False, "username": user.get("username"), "exp": user.get("exp")}}


@app.post("/auth/logout")
def logout(response: Response):
    res = JSONResponse({"message": "Logged out successfully"})
    res.delete_cookie(COOKIE_NAME)
    return res

if __name__=="__main__":
  uvicorn.run("main_simple:app",host="localhost",port=8000,reload=True)



from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import base64
import cv2
from deepface import DeepFace
import os
import json
app = FastAPI()

# uvicorn main:app --reload --port 3429 

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ImageData(BaseModel):
    img: str 

class safe_profile(BaseModel):
    login: str 
    password: str
    img: str

class login(BaseModel):
    img: str

class bilimclass(BaseModel):
    login: str
class add_bilimclass(BaseModel):
    login: str
    bilim_login: str
    password: str
@app.post("/check_spoof")
async def analyze_image(data: ImageData):
    try:


        img_bytes = base64.b64decode(data.img.split(",")[1])
        nparray = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)

        try: 
            face_objs = DeepFace.extract_faces(img_path=img, 
                                               detector_backend="opencv", 
                                               anti_spoofing=True, 
                                               enforce_detection=False)
            
            is_real = face_objs[0]['is_real']
            confidence = face_objs[0]['antispoof_score']

            if is_real == False:
                confidence = 1-confidence
        except Exception as e:
            print(f"ошибка в DeepFace {e}")

        return {"is_real": is_real, "confidence": confidence}
    except Exception as e:
        print(f"ошибка в декониге: {e}")
        return {"status": "error", "message": str(e)}

@app.post("/singin")
async def singin(data: safe_profile):
    try:
        # img_bytes = base64.b64decode(data.img.split(",")[1])

        print(data.login, data.password, data.img)
        users = []
        user_data = {
            "login": data.login,
            "password": data.password,
            "img": data.img,
            "bilimclass": None
        }

        users_path = "users.json"

        if os.path.exists(users_path):
            with open(users_path, "r", encoding="utf-8") as f:
                try:
                    users = json.load(f)
                except json.JSONDecodeError:
                    users = []
        else:
            users = []

        users.append(user_data)
        if os.path.exists(users_path):
            print("готово")
            with open(users_path, "w", encoding="utf-8") as f:
                json.dump(users, f, ensure_ascii=False, indent=2)
        else:
            users = []
            print(f"Ошибка созранения пользователя в {users_path}")

    except Exception as e:
        print(f"ошибка в декониге: {e}")
        return {"status": "error", "message": str(e)}
    
    return {"status": 'true'}

@app.post("/login")
async def login(data: login):
    try:
        img_bytes = base64.b64decode(data.img.split(",")[1])
        nparray = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparray, cv2.IMREAD_COLOR)

        users_path = "users.json"
        if not os.path.exists(users_path):
            return {"status": "error", "message": "Нет зарегистрированных пользователей"}
        
        with open(users_path, "r", encoding="utf-8") as f:
            users = json.load(f)

        for user in users:
            try:
                img_input_bytes = base64.b64decode(data.img.split(",")[1])
                user_np = np.frombuffer(img_input_bytes, np.uint8)
                user_img = cv2.imdecode(user_np, cv2.IMREAD_COLOR)

                result = DeepFace.verify(img1_path=img, img2_path=user_img, enforce_detection=False)

                if result["verified"]:
                    return {"status": "success", "login": user["login"]}
            except Exception as e:
                print(f"Ошибка при сравнении с пользователем {user['login']}: {e}")

    except Exception as e:
        print(f"Ошибка при верификации: {e}")
        return {"status": "error", "message": str(e)}
    
@app.post("/bilimclass")
async def bilimLogin(data: bilimclass):
    try:
        users_path = "users.json"
        if not os.path.exists(users_path):
            return {"status": "error", "message": "Нет зарегистрированных пользователей"}
        
        with open(users_path, "r", encoding="utf-8") as f:
            users = json.load(f)

        for user in users:
            if user["login"] == data.login:
                if "bilimclass" in user and user["bilimclass"] is not None:
                    return  {
                    "status": "success",
                    "bilimclass": user["bilimclass"]  # {'login': ..., 'password': ...}
                }
                else:
                    return {"status": "bilimclass_not_finded"}
            else:
                return {"status": "user_not_founded"}
    except:
        return{"status": "error"}
    
@app.post("/add_bilimclass")
async def add_bilimclass(data: add_bilimclass):
    try:
        users_path = "users.json"
        if not os.path.exists(users_path):
            return {"status": "error", "message": "Нет зарегистрированных пользователей"}
        with open(users_path, "r", encoding="utf-8") as f:
            users = json.load(f)

        for user in users:
            if user["login"] == data.login:
                user["bilimclass"] = {
                "login": data.bilim_login,
                "password": data.password
            }
                break    
        with open(users_path, "w", encoding="utf-8") as f:
            json.dump(users, f, ensure_ascii=False, indent=2)
        return {"status": "success", "login": data.bilim_login}    
    except:
        return {"status": "error"}
    
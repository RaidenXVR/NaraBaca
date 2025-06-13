import os
import shutil
import uuid

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from model_utils import convert_mp3_to_wav, predict_keywords

app = FastAPI()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",  # Add the origin(s) where your frontend is running
    "http://localhost:5173",
    "http://audio-classif.raidenxvr.my.id",
    "*",  # Example for Vite default port
    # You can add more origins here, or use ["*"] for development (use with caution in production)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=[
        "POST"
    ],  # Allows all standard methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def check():
    return JSONResponse(content={"condition": "Server is ON"})


@app.post("/predict")
async def predict_audio(file: UploadFile = File(...)):
    try:
        ext = file.filename.split(".")[-1]
        temp_path = os.path.join(UPLOAD_DIR, f"{uuid.uuid4()}.{ext}")

        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Konversi MP3 ke WAV jika perlu
        if ext.lower() == "mp3":
            wav_path = temp_path.replace(".mp3", ".wav")
            convert_mp3_to_wav(temp_path, wav_path)
            os.remove(temp_path)
            temp_path = wav_path

        keywords = predict_keywords(temp_path)

        return JSONResponse(content={"predicted_keywords": keywords})

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

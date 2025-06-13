# Stage 1: Build Environment
FROM python:3.10.18-slim-bookworm AS builder

WORKDIR /app

# Install system dependencies needed for building Python packages
# Use --no-install-recommends to avoid installing recommended but not strictly necessary packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    libffi-dev \
    libssl-dev \
    python3-dev \
    libsndfile1 \
    # If pydub needs ffmpeg for mp3 conversion, you'd add it here.
    # However, for torchaudio with soundfile backend, libsndfile1 is key.
    # ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt to leverage Docker cache
COPY requirements.txt .

# Install Python dependencies
# --no-cache-dir: prevents pip from storing downloaded wheels, reducing build time layer size
# For torch and tensorflow, explicitly specify CPU versions if you're not using GPU
# You might need to change 'torch' to 'torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu'
# and 'tensorflow' to 'tensorflow-cpu'
# However, for simplicity, first try without explicit CPU version in case default is already CPU for slim images.
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir \
    torch==2.6.0+cpu \
    torchaudio==2.6.0+cpu \
    --index-url https://download.pytorch.org/whl/cpu

# Clean up pip cache immediately after installation
RUN rm -rf /root/.cache/pip

# Download models in the build stage
# This prevents them from being downloaded every time the app starts, and puts them in a build layer
# These models will be copied to the final image.
RUN python -c "from transformers import Wav2Vec2Model, Wav2Vec2Processor; Wav2Vec2Processor.from_pretrained('cahya/wav2vec2-large-xlsr-indonesian'); Wav2Vec2Model.from_pretrained('cahya/wav2vec2-large-xlsr-indonesian')"


# Stage 2: Runtime Environment
# Use a smaller base image if possible, or the same slim Python image
FROM python:3.10.18-slim-bookworm

WORKDIR /app

# Install only essential runtime system dependencies
# libsndfile1 is needed for torchaudio with soundfile backend
# If pydub is used for MP3 conversion, ffmpeg is needed here.
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    # ffmpeg \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Copy the installed Python packages from the builder stage
# Adjust this path if your installation strategy or Python version differs
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
# Copy the downloaded Hugging Face models from the builder stage cache
# This path is where Hugging Face Transformers caches models. Adjust if different.
COPY --from=builder /root/.cache/huggingface /root/.cache/huggingface

# Copy your application code and local model/data files
COPY . .
# Ensure voice_classifier_finetuned_v1.keras and words.txt are in the copied context

# Set environment variable for Hugging Face cache location in the final image
ENV HF_HOME /root/.cache/huggingface

EXPOSE 3000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "3000"]
#!/bin/bash

# Setup Models Script
# Initializes lightweight Ollama models for P-Assistant optimization
# Run after: docker compose up

set -e

OLLAMA_HOST="${OLLAMA_HOST:-http://localhost:11434}"

echo "🚀 Setting up OpenClaw models..."
echo "   Target: $OLLAMA_HOST"
echo ""

# Function to check if model exists
model_exists() {
  local model=$1
  curl -s "$OLLAMA_HOST/api/tags" | grep -q "\"name\":\"$model\"" && return 0 || return 1
}

# Function to pull model
pull_model() {
  local model=$1
  local description=$2
  
  if model_exists "$model"; then
    echo "✅ $model — already available"
  else
    echo "⬇️  Pulling $model ($description)..."
    curl -X POST "$OLLAMA_HOST/api/pull" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"$model\"}" \
      --progress-bar
    echo ""
    echo "✅ $model — ready"
  fi
}

# Wait for Ollama to be ready
echo "⏳ Waiting for Ollama service..."
max_attempts=30
attempt=0
while [ $attempt -lt $max_attempts ]; do
  if curl -s "$OLLAMA_HOST/api/tags" > /dev/null 2>&1; then
    echo "✅ Ollama service ready"
    break
  fi
  attempt=$((attempt + 1))
  sleep 1
done

if [ $attempt -eq $max_attempts ]; then
  echo "❌ Ollama service not responding at $OLLAMA_HOST"
  exit 1
fi

echo ""
echo "📦 Checking models..."
echo ""

# Pull models
pull_model "phi4-mini" "General reasoning baseline (8k context)"
pull_model "neural-chat" "Fast routing & classification (4k context)"

echo ""
echo "✅ Model setup complete!"
echo ""
echo "📊 Available models:"
curl -s "$OLLAMA_HOST/api/tags" | grep -o '"name":"[^"]*"' | cut -d'"' -f4 | sed 's/^/   - /'
echo ""
echo "💡 Configuration active in: data/openclaw.json"
echo "   - Primary: ollama/phi4-mini"
echo "   - Fallback: ollama/neural-chat (for faster classification)"

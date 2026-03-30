#!/bin/bash

# ============================================================
# Hugging Face Integration for Openclaw Project
# ============================================================
#
# This script helps set up Hugging Face integration
# Run: chmod +x setup-huggingface.sh && ./setup-huggingface.sh
#

set -e

echo "🤗 Hugging Face Integration Setup for Openclaw"
echo "================================================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env 2>/dev/null || true
fi

# Prompt for API token
echo "📋 Step 1: Hugging Face API Token"
echo "Get your token from: https://huggingface.co/settings/tokens"
read -p "Enter your Hugging Face API Token: " HF_TOKEN

if [ -z "$HF_TOKEN" ]; then
    echo "❌ Token is required!"
    exit 1
fi

# Add token to .env
if grep -q "HUGGINGFACE_API_TOKEN=" .env; then
    # Update existing token
    sed -i "s|HUGGINGFACE_API_TOKEN=.*|HUGGINGFACE_API_TOKEN=$HF_TOKEN|" .env
else
    # Add new token
    echo "HUGGINGFACE_API_TOKEN=$HF_TOKEN" >> .env
fi

echo "✅ Token added to .env"
echo ""

# Step 2: Model Selection
echo "🤖 Step 2: Select Default Models"
echo ""
echo "Text Generation Models:"
echo "  1. mistralai/Mistral-7B-Instruct-v0.2 (Recommended - Fast & Good)"
echo "  2. meta-llama/Llama-2-7b-chat-hf (Meta's LLaMA)"
echo "  3. tiiuae/falcon-7b-instruct (Falcon)"
read -p "Choose text model [1-3] (default: 1): " TEXT_MODEL_CHOICE

case $TEXT_MODEL_CHOICE in
    2) TEXT_MODEL="meta-llama/Llama-2-7b-chat-hf" ;;
    3) TEXT_MODEL="tiiuae/falcon-7b-instruct" ;;
    *) TEXT_MODEL="mistralai/Mistral-7B-Instruct-v0.2" ;;
esac

echo ""
echo "Image Models:"
echo "  1. stabilityai/stable-diffusion-3-medium (Recommended - Free)"
echo "  2. black-forest-labs/FLUX.1-dev (Premium - Higher Quality)"
read -p "Choose image model [1-2] (default: 1): " IMAGE_MODEL_CHOICE

case $IMAGE_MODEL_CHOICE in
    2) IMAGE_MODEL="black-forest-labs/FLUX.1-dev" ;;
    *) IMAGE_MODEL="stabilityai/stable-diffusion-3-medium" ;;
esac

# Update .env with model choices
if grep -q "HF_TEXT_MODEL=" .env; then
    sed -i "s|HF_TEXT_MODEL=.*|HF_TEXT_MODEL=$TEXT_MODEL|" .env
else
    echo "HF_TEXT_MODEL=$TEXT_MODEL" >> .env
fi

if grep -q "HF_IMAGE_MODEL=" .env; then
    sed -i "s|HF_IMAGE_MODEL=.*|HF_IMAGE_MODEL=$IMAGE_MODEL|" .env
else
    echo "HF_IMAGE_MODEL=$IMAGE_MODEL" >> .env
fi

echo "✅ Models configured"
echo ""

# Step 3: Package Installation
echo "📦 Step 3: Installing Dependencies"
echo ""

if [ -f "data/workspace/package.json" ]; then
    cd data/workspace
    
    echo "Installing @huggingface/hub..."
    npm install @huggingface/hub
    
    echo "Installing transformers (optional)..."
    npm install --optional transformers || true
    
    cd ../..
    echo "✅ Dependencies installed"
else
    echo "⚠️  package.json not found in data/workspace/"
fi

echo ""

# Step 4: Docker Setup
echo "🐳 Step 4: Docker Configuration"
echo ""

# Add HF_HOME volume to docker-compose.yml if not present
if ! grep -q "HF_HOME" docker-compose.yml; then
    echo "Adding HF_HOME to docker-compose.yml..."
    
    # This is informational - manual edit might be needed
    echo ""
    echo "⚠️  Manual Step Required:"
    echo "Add these lines to 'openclaw-gateway' service in docker-compose.yml:"
    echo ""
    echo "    environment:"
    echo "      HF_HOME: /home/node/.cache/huggingface"
    echo "    volumes:"
    echo "      - hf_cache:/home/node/.cache/huggingface"
    echo ""
    echo "And add at the end of docker-compose.yml:"
    echo ""
    echo "volumes:"
    echo "  hf_cache:"
    echo ""
fi

# Step 5: Create lib directory if needed
echo "📂 Step 5: Setting up library files"
echo ""

if [ ! -d "data/workspace/lib" ]; then
    mkdir -p data/workspace/lib
    echo "Created data/workspace/lib directory"
fi

if [ ! -f "data/workspace/lib/huggingface.ts" ]; then
    echo "Creating hoggingface utility file..."
    echo "Note: huggingface.ts should be in data/workspace/lib/"
fi

# Step 6: Verify setup
echo ""
echo "✅ Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Manually update docker-compose.yml (see above)"
echo "2. Update .env file with any additional settings"
echo "3. Create API routes in data/workspace/app/api/hf-*/route.ts"
echo "4. Test with: npm run dev"
echo ""
echo "📚 Documentation: See HUGGINGFACE_SETUP.md"
echo ""
echo "🚀 Quick Test:"
echo ""
echo "curl -X POST http://localhost:3000/api/hf-generate \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"prompt\": \"Hello, world!\"}'"
echo ""

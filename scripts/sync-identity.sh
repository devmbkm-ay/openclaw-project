#!/bin/bash
# Sync IDENTITY.md from the local "main" agent workspace to the remote
# production OpenClaw gateway (assistant.ricardomboukou.online).
#
# The local docker-compose deployment and the remote Coolify deployment
# are separate environments with separate filesystems — this script is
# the deliberate, on-demand bridge between them. It only ever touches
# IDENTITY.md; session memory/logs are left alone on purpose since they
# should diverge between the two running agents.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOCAL_IDENTITY="$REPO_ROOT/data/workspace/IDENTITY.md"
SSH_KEY="$HOME/.ssh/coolify"
REMOTE_HOST="root@46.224.160.205"
REMOTE_CONTAINER="openclaw-k10tl4f16371sw25n53bzmsk"
REMOTE_PATH="/root/.openclaw/workspace/IDENTITY.md"

if [[ ! -f "$LOCAL_IDENTITY" ]]; then
  echo "error: $LOCAL_IDENTITY not found" >&2
  exit 1
fi

echo "Pushing $LOCAL_IDENTITY -> $REMOTE_HOST:$REMOTE_CONTAINER:$REMOTE_PATH"
REMOTE_TMP="/root/.identity-sync-tmp-$$.md"
scp -i "$SSH_KEY" -o ConnectTimeout=8 "$LOCAL_IDENTITY" "$REMOTE_HOST:$REMOTE_TMP"
# Destination may be a stale/broken symlink (seen pointing at /proc/self/fd/0
# in the wild) — docker cp refuses to write through that, so clear it first.
ssh -i "$SSH_KEY" -o ConnectTimeout=8 "$REMOTE_HOST" \
  "docker exec $REMOTE_CONTAINER sh -c '[ -L $REMOTE_PATH ] && rm -f $REMOTE_PATH; exit 0'; \
   docker cp $REMOTE_TMP $REMOTE_CONTAINER:$REMOTE_PATH && rm -f $REMOTE_TMP"

echo "Done. Verifying remote content:"
ssh -i "$SSH_KEY" -o ConnectTimeout=8 "$REMOTE_HOST" \
  "docker exec $REMOTE_CONTAINER cat $REMOTE_PATH"

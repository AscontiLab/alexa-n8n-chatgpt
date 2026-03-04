#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LAMBDA_DIR="$ROOT_DIR/alexa-lambda"
AWS_BIN="${AWS_BIN:-$HOME/.local/bin/aws}"
FUNCTION_NAME="${FUNCTION_NAME:-}"
AWS_REGION="${AWS_REGION:-}"

if [[ -z "$FUNCTION_NAME" ]]; then
  echo "ERROR: FUNCTION_NAME is not set"
  echo "Example: FUNCTION_NAME=my-alexa-skill AWS_REGION=eu-central-1 $0"
  exit 1
fi

if [[ -z "$AWS_REGION" ]]; then
  echo "ERROR: AWS_REGION is not set"
  echo "Example: FUNCTION_NAME=my-alexa-skill AWS_REGION=eu-central-1 $0"
  exit 1
fi

if [[ ! -x "$AWS_BIN" ]]; then
  echo "ERROR: aws binary not found at $AWS_BIN"
  exit 1
fi

cd "$LAMBDA_DIR"

if [[ ! -d node_modules ]]; then
  npm install
fi

# Use bestzip to generate AWS-compatible deployment archive.
npx bestzip function.zip index.js package.json package-lock.json node_modules >/dev/null

"$AWS_BIN" lambda update-function-code \
  --function-name "$FUNCTION_NAME" \
  --zip-file "fileb://$LAMBDA_DIR/function.zip" \
  --region "$AWS_REGION" >/tmp/lambda_update_code.json

echo "Lambda code updated."
"$AWS_BIN" lambda get-function \
  --function-name "$FUNCTION_NAME" \
  --region "$AWS_REGION" \
  --query 'Configuration.[FunctionName,Runtime,LastModified]' \
  --output table

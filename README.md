# Alexa + n8n + ChatGPT

Dieses Projekt enthält:
- `alexa-lambda/`: AWS Lambda Code für einen Alexa Custom Skill
- `alexa-model/interaction-model.json`: deutsches Interaktionsmodell
- `n8n/alexa-chatgpt-workflow.json`: importierbarer n8n Workflow

## 1) Alexa Skill anlegen
1. Alexa Developer Console -> Custom Skill erstellen.
2. Invocation Name z. B. `chat assistent`.
3. Interaktionsmodell aus `alexa-model/interaction-model.json` importieren.
4. Endpoint auf AWS Lambda ARN setzen.

## 2) Lambda deployen
Im Ordner `alexa-lambda`:

```bash
npm install
zip -r function.zip .
```

Dann `function.zip` in AWS Lambda hochladen (Node.js 20.x), Handler: `index.handler`.

## 3) n8n Workflow
1. `n8n/alexa-chatgpt-workflow.json` importieren.
2. Workflow aktivieren.
3. Sicherstellen, dass als Umgebungsvariable `OPENAI_API_KEY` gesetzt ist.
4. Webhook URL ist dann: `https://agents.umzwei.de/webhook/alexa-chatgpt`.

## Erwartetes Request/Response-Format
Alexa Lambda sendet an n8n:

```json
{
  "text": "<gesprochener Text>",
  "locale": "de-DE",
  "requestId": "...",
  "sessionId": "...",
  "userId": "..."
}
```

n8n antwortet an Lambda mit:

```json
{
  "speech": "Antworttext für Alexa"
}
```

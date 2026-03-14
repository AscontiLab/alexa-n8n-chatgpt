# Alexa + n8n + ChatGPT

## Ueberblick

Sprachassistent-Stack fuer einen Alexa Custom Skill mit AWS Lambda als Entry Point und n8n als Workflow-Backend. Die Sprachverarbeitung laeuft ueber einen HTTP-Request von Lambda an n8n; die Antwort wird als Alexa-Speech zurueckgegeben.

## Zweck

- Alexa-Eingaben aus einem Custom Skill entgegennehmen
- An n8n weiterreichen
- Dort KI-Logik, Routing und Integrationen ausfuehren
- Die erzeugte Antwort wieder an Alexa ausspielen

## Bestandteile

- `alexa-lambda/`
  - `index.js`: Lambda-Handler fuer Alexa Requests
  - `package.json`: Node-Abhaengigkeiten fuer das Lambda-Paket
- `alexa-model/interaction-model.json`
  - Deutsches Alexa-Interaktionsmodell
- `n8n/alexa-chatgpt-workflow.json`
  - Importierbarer n8n-Workflow
- `scripts/deploy_lambda.sh`
  - Hilfsskript fuer Deployment/Packaging
- `alexa-setup/`
  - Zusatztasks fuer die Skill-Einrichtung

## Voraussetzungen

- AWS Lambda
- Alexa Developer Console
- n8n-Instanz mit oeffentlichem Webhook
- OpenAI-API-Key in der n8n-Umgebung
- Node.js 20.x fuer das Lambda-Deployment

## Einrichtung

```bash
cd alexa-lambda
npm install
zip -r function.zip .
```

Danach:

1. Custom Skill in der Alexa Developer Console anlegen
2. `alexa-model/interaction-model.json` importieren
3. `function.zip` in AWS Lambda hochladen
4. Lambda-ARN als Skill-Endpoint hinterlegen
5. `n8n/alexa-chatgpt-workflow.json` in n8n importieren und aktivieren

## Konfiguration

- n8n erwartet `OPENAI_API_KEY` als Umgebungsvariable
- Die Workflow-Webhook-URL muss im Lambda-Code bzw. in der Lambda-Konfiguration hinterlegt sein
- Invocation Name und Intents werden im Alexa-Interaktionsmodell gepflegt

## Nutzung

Request von Alexa/Lambda an n8n:

```json
{
  "text": "<gesprochener Text>",
  "locale": "de-DE",
  "requestId": "...",
  "sessionId": "...",
  "userId": "..."
}
```

Antwort von n8n an Lambda:

```json
{
  "speech": "Antworttext fuer Alexa"
}
```

## Betriebshinweise

- Das Repo ist vor allem ein Integrationspaket, keine monolithische App
- Fehlerquellen liegen typischerweise in Skill-Endpoint, Webhook-Erreichbarkeit und fehlenden Secrets
- Eine produktive Version sollte Timeouts, Fallback-Speech und Request-Signaturpruefung sauber absichern

## Status

Funktionsfaehiger Integrationsstand fuer Alexa -> Lambda -> n8n -> KI-Antwort.

const Alexa = require("ask-sdk-core");

const N8N_WEBHOOK_URL = "https://agents.umzwei.de/webhook/alexa-chatgpt";
const REQUEST_TIMEOUT_MS = 15000;

async function postToN8n(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    const rawText = await response.text();
    let parsed;

    try {
      parsed = rawText ? JSON.parse(rawText) : {};
    } catch (_) {
      parsed = { speech: rawText };
    }

    if (!response.ok) {
      const errMessage = parsed?.error || rawText || `HTTP ${response.status}`;
      throw new Error(`n8n webhook failed: ${errMessage}`);
    }

    return parsed;
  } finally {
    clearTimeout(timeout);
  }
}

function extractSpeechFromWebhookResult(result) {
  return (
    result?.speech ||
    result?.output ||
    result?.answer ||
    result?.text ||
    result?.response ||
    "Ich habe gerade keine Antwort erhalten."
  );
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest";
  },
  handle(handlerInput) {
    const speakOutput =
      "Hallo. Du kannst direkt etwas sagen, und ich frage Chat GPT für dich.";
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt("Was möchtest du wissen?")
      .getResponse();
  }
};

const ChatIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "ChatIntent"
    );
  },
  async handle(handlerInput) {
    const request = handlerInput.requestEnvelope?.request || {};
    const session = handlerInput.requestEnvelope?.session || {};
    const slots = request?.intent?.slots || {};
    const userText = slots?.query?.value?.trim();

    if (!userText) {
      return handlerInput.responseBuilder
        .speak("Ich habe dich nicht verstanden. Bitte sage deine Frage noch einmal.")
        .reprompt("Bitte sage deine Frage.")
        .getResponse();
    }

    try {
      const webhookResult = await postToN8n({
        text: userText,
        locale: request.locale,
        requestId: request.requestId,
        sessionId: session.sessionId,
        userId: session?.user?.userId
      });

      const speakOutput = extractSpeechFromWebhookResult(webhookResult);
      return handlerInput.responseBuilder.speak(speakOutput).reprompt("Noch eine Frage?").getResponse();
    } catch (error) {
      console.error("ChatIntent error:", error);
      return handlerInput.responseBuilder
        .speak("Entschuldigung, beim Abrufen der Antwort ist ein Fehler aufgetreten.")
        .reprompt("Bitte versuche es gleich noch einmal.")
        .getResponse();
    }
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Sage einfach deine Frage, und ich leite sie an Chat GPT weiter.")
      .reprompt("Was möchtest du wissen?")
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.speak("Okay, bis bald.").getResponse();
  }
};

const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.FallbackIntent"
    );
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak("Das habe ich nicht verstanden. Stelle bitte eine Frage.")
      .reprompt("Was möchtest du wissen?")
      .getResponse();
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === "SessionEndedRequest";
  },
  handle(handlerInput) {
    console.log("Session ended:", JSON.stringify(handlerInput.requestEnvelope));
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.error("Global error:", error);
    return handlerInput.responseBuilder
      .speak("Es ist ein Fehler aufgetreten. Bitte versuche es erneut.")
      .reprompt("Bitte versuche es erneut.")
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ChatIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();

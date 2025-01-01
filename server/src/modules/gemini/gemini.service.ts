import { model, generationConfig } from "../../config/gemini.config";
import { generateFormQuestionPrompt } from "../../utils/prompt";

export class GeminiService {
  async createQuestion(text: string) {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(
      generateFormQuestionPrompt(text)
    );
    return JSON.parse(result.response.text());
  }
}

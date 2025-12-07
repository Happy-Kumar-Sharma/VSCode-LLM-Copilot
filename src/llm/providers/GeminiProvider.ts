import { ILLMProvider } from '../LLMService';
import * as vscode from 'vscode';
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiProvider implements ILLMProvider {
    name = 'gemini';
    private genAI: GoogleGenerativeAI | undefined;

    constructor(private context: vscode.ExtensionContext) { }

    private async init() {
        const apiKey = await this.context.secrets.get('gemini_api_key');
        if (apiKey) {
            this.genAI = new GoogleGenerativeAI(apiKey);
        }
    }

    async chat(prompt: string): Promise<string> {
        if (!this.genAI) {
            await this.init();
        }

        if (!this.genAI) {
            return "Please set your Gemini API key using the command 'LLM Copilot: Set Gemini API Key'.";
        }

        try {
            // Use gemini-1.5-flash as gemini-pro often returns 404 on the v1 API for free tier/some regions
            const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            return `Error calling Gemini: ${error.message}`;
        }
    }
}

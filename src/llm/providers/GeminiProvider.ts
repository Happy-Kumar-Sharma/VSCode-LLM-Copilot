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
            const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error: any) {
            return `Error calling Gemini: ${error.message}`;
        }
    }
}

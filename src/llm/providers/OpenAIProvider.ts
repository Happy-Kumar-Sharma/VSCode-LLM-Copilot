import { ILLMProvider } from '../LLMService';
import * as vscode from 'vscode';
import OpenAI from 'openai';

export class OpenAIProvider implements ILLMProvider {
    name = 'openai';
    private openai: OpenAI | undefined;

    constructor(private context: vscode.ExtensionContext) { }

    private async init() {
        const apiKey = await this.context.secrets.get('openai_api_key');
        if (apiKey) {
            this.openai = new OpenAI({ apiKey });
        }
    }

    async chat(prompt: string): Promise<string> {
        if (!this.openai) {
            await this.init();
        }

        if (!this.openai) {
            return "Please set your OpenAI API key using the command 'LLM Copilot: Set OpenAI API Key'.";
        }

        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "gpt-3.5-turbo",
            });
            return completion.choices[0].message.content || "No response.";
        } catch (error: any) {
            return `Error calling OpenAI: ${error.message}`;
        }
    }
}

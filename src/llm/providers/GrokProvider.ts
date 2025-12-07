import { ILLMProvider } from '../LLMService';
import * as vscode from 'vscode';
import OpenAI from 'openai';

export class GrokProvider implements ILLMProvider {
    name = 'grok';
    private openai: OpenAI | undefined;

    constructor(private context: vscode.ExtensionContext) { }

    private async init() {
        const apiKey = await this.context.secrets.get('grok_api_key');
        if (apiKey) {
            // xAI uses the OpenAI SDK but with a different base URL
            this.openai = new OpenAI({
                apiKey,
                baseURL: "https://api.x.ai/v1"
            });
        }
    }

    async chat(prompt: string): Promise<string> {
        if (!this.openai) {
            await this.init();
        }

        if (!this.openai) {
            return "Please set your Grok API key using the command 'LLM Copilot: Set Grok API Key'.";
        }

        try {
            const completion = await this.openai.chat.completions.create({
                messages: [{ role: "user", content: prompt }],
                model: "grok-beta",
            });
            return completion.choices[0].message.content || "No response.";
        } catch (error: any) {
            return `Error calling Grok: ${error.message}`;
        }
    }
}

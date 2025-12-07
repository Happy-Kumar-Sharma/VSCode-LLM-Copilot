import { ILLMProvider } from '../LLMService';
import * as vscode from 'vscode';
import Anthropic from '@anthropic-ai/sdk';

export class AnthropicProvider implements ILLMProvider {
    name = 'anthropic';
    private anthropic: any | undefined;

    constructor(private context: vscode.ExtensionContext) { }

    private async init() {
        const apiKey = await this.context.secrets.get('anthropic_api_key');
        if (apiKey) {
            this.anthropic = new Anthropic({ apiKey });
        }
    }

    async chat(prompt: string): Promise<string> {
        if (!this.anthropic) {
            await this.init();
        }

        if (!this.anthropic) {
            return "Please set your Anthropic API key using the command 'LLM Copilot: Set Anthropic API Key'.";
        }

        try {
            const message = await this.anthropic.messages.create({
                max_tokens: 1024,
                messages: [{ role: 'user', content: prompt }],
                model: 'claude-3-opus-20240229',
            });

            // The Anthropic SDK's messages.create response has content as an array of ContentBlock.
            // We iterate through the content blocks and concatenate any text blocks found.
            if (message.content && message.content.length > 0) {
                let fullResponse = '';
                for (const block of message.content) {
                    if (block.type === 'text') {
                        fullResponse += block.text;
                    }
                }
                if (fullResponse) {
                    return fullResponse;
                }
            }
            return "No text response received.";

        } catch (error: any) {
            return `Error calling Anthropic: ${error.message}`;
        }
    }
}

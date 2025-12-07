import * as vscode from 'vscode';

export interface ILLMProvider {
    name: string;
    chat(prompt: string): Promise<string>;
}

export class LLMService {
    private providers: Map<string, ILLMProvider> = new Map();
    private activeProvider: string = 'gemini';

    constructor() { }

    public registerProvider(provider: ILLMProvider) {
        this.providers.set(provider.name, provider);
    }

    public setActiveProvider(name: string) {
        if (this.providers.has(name)) {
            this.activeProvider = name;
        }
    }

    public async chat(prompt: string): Promise<string> {
        const provider = this.providers.get(this.activeProvider);
        if (!provider) {
            return "No active LLM provider found.";
        }
        return await provider.chat(prompt);
    }
}

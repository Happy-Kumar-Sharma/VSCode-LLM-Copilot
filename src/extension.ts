import * as vscode from 'vscode';
import { ChatPanel } from './ChatPanel';
import { LLMService } from './llm/LLMService';
import { GeminiProvider } from './llm/providers/GeminiProvider';
import { OpenAIProvider } from './llm/providers/OpenAIProvider';
import { AnthropicProvider } from './llm/providers/AnthropicProvider';
import { GrokProvider } from './llm/providers/GrokProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "vscode-llm-copilot" is now active!');

    const llmService = new LLMService();
    llmService.registerProvider(new GeminiProvider(context));
    llmService.registerProvider(new OpenAIProvider(context));
    llmService.registerProvider(new AnthropicProvider(context));
    llmService.registerProvider(new GrokProvider(context));

    // Initialize with default setting
    const config = vscode.workspace.getConfiguration('llmCopilot');
    const defaultProvider = config.get<string>('defaultProvider') || 'gemini';
    llmService.setActiveProvider(defaultProvider);

    // Update active provider when config changes
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('llmCopilot.defaultProvider')) {
            const newProvider = vscode.workspace.getConfiguration('llmCopilot').get<string>('defaultProvider');
            if (newProvider) {
                llmService.setActiveProvider(newProvider);
            }
        }
    }));

    const sidebarProvider = new ChatPanel(context.extensionUri, llmService);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            "llm-copilot.chatView",
            sidebarProvider
        )
    );

    context.subscriptions.push(
        vscode.commands.registerCommand("vscode-llm-copilot.chat", () => {
            vscode.commands.executeCommand("workbench.view.extension.llm-copilot-sidebar-view");
        })
    );

    // API Key Commands
    context.subscriptions.push(vscode.commands.registerCommand('vscode-llm-copilot.setGeminiKey', async () => {
        const key = await vscode.window.showInputBox({ prompt: 'Enter your Gemini API Key', password: true });
        if (key) {
            await context.secrets.store('gemini_api_key', key);
            vscode.window.showInformationMessage('Gemini API Key saved.');
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('vscode-llm-copilot.setOpenAIKey', async () => {
        const key = await vscode.window.showInputBox({ prompt: 'Enter your OpenAI API Key', password: true });
        if (key) {
            await context.secrets.store('openai_api_key', key);
            vscode.window.showInformationMessage('OpenAI API Key saved.');
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('vscode-llm-copilot.setAnthropicKey', async () => {
        const key = await vscode.window.showInputBox({ prompt: 'Enter your Anthropic API Key', password: true });
        if (key) {
            await context.secrets.store('anthropic_api_key', key);
            vscode.window.showInformationMessage('Anthropic API Key saved.');
        }
    }));

    context.subscriptions.push(vscode.commands.registerCommand('vscode-llm-copilot.setGrokKey', async () => {
        const key = await vscode.window.showInputBox({ prompt: 'Enter your Grok API Key', password: true });
        if (key) {
            await context.secrets.store('grok_api_key', key);
            vscode.window.showInformationMessage('Grok API Key saved.');
        }
    }));
}

export function deactivate() { }

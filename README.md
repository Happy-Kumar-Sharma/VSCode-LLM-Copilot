# VS Code LLM Copilot

**LLM Copilot** is a VS Code extension that brings the power of multiple Large Language Models (LLMs) directly into your editor. Chat with Gemini, ChatGPT, Claude, and Grok without leaving your code.

## Features

-   **Multi-Provider Support**: Seamlessly switch between Google Gemini, OpenAI (ChatGPT), Anthropic (Claude), and xAI (Grok).
-   **Integrated Chat**: A clean, distraction-free chat interface in the side bar.
-   **Secure**: Your API keys are stored securely using VS Code's native Secret Storage.

## Requirements

You must have your own API keys for the services you wish to use:
-   [Google Gemini API Key](https://aistudio.google.com/)
-   [OpenAI API Key](https://platform.openai.com/api-keys)
-   [Anthropic API Key](https://console.anthropic.com/)
-   [xAI API Key](https://console.x.ai/)

## Installation

1.  Install the extension from the VS Code Marketplace (Coming Soon).
2.  Or build from source (see [CONTRIBUTING.md](CONTRIBUTING.md)).

## Usage

### Setup API Keys
Open the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and run the command for your provider:
-   `LLM Copilot: Set Gemini API Key`
-   `LLM Copilot: Set OpenAI API Key`
-   `LLM Copilot: Set Anthropic API Key`
-   `LLM Copilot: Set Grok API Key`

### Start Chatting
1.  Click the **LLM Copilot** icon in the Activity Bar.
2.  Type your question and hit Enter.

### Switch Provider
The default provider is **Gemini**. To change it:
1.  Go to **Settings**.
2.  Search for `llmCopilot.defaultProvider`.
3.  Select your preferred provider.
4.  Reload the window to apply changes.

## License
[MIT](LICENSE)

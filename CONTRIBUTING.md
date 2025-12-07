# Contributing to VS Code LLM Copilot

Thank you for your interest in contributing! We welcome contributions from the community.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Git](https://git-scm.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/vscode-llm-copilot.git
    cd vscode-llm-copilot
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    npm run build
    ```

3.  **Open in VS Code:**
    ```bash
    code .
    ```

## Development Workflow

1.  **Running the Extension:**
    -   Press `F5` in VS Code. This will compile the extension and open a new "Extension Development Host" window with the extension loaded.

2.  **Making Changes:**
    -   Source code is in `src/`.
    -   Webview UI code is in `media/`.
    -   `src/extension.ts`: Entry point.
    -   `src/ChatPanel.ts`: Manages the webview.
    -   `src/llm/providers/`: LLM integration logic.

3.  **Debugging:**
    -   You can set breakpoints in `.ts` files.
    -   Use `console.log` for output to the Debug Console.
    -   For Webview debugging: Open "Developer Tools" in the Extension Development Host window (`Help` > `Toggle Developer Tools`).

4.  **Testing:**
    -   Run `npm test` to execute the test suite (currently basic activation test).
    -   Run `vsce ls --tree` to see all included files.

5.  **Publishing:**
    -   Run `npm run compile` to compile the extension.
    -   Run `npm install -g @vscode/vsce` to install the VS Code Extension CLI.
    -   Run `vsce package` to package the extension.
    -   Run `npx @vscode/vsce login HappyKumarSharma` to login to the VS Code Marketplace
    -   Run `npx @vscode/vsce publish` to publish the extension to the VS Code Marketplace

## Project Structure

-   `src/`
    -   `extension.ts`: Main activation logic.
    -   `ChatPanel.ts`: Webview provider implementation.
    -   `llm/`: Logic for connecting to LLMs.
        -   `LLMService.ts`: Manager for different providers.
        -   `providers/`: Individual provider implementations (Gemini, OpenAI, etc.).
-   `media/`: CSS and JS for the chat interface.

## Submission
1.  Fork the repo and create your branch from `main`.
2.  Test your changes.
3.  Submit a Pull Request.

## License
MIT

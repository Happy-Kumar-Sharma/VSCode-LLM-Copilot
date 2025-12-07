import * as vscode from "vscode";
import { LLMService } from "./llm/LLMService";

export class ChatPanel implements vscode.WebviewViewProvider {
    _view?: vscode.WebviewView;
    _doc?: vscode.TextDocument;

    constructor(private readonly _extensionUri: vscode.Uri, private readonly _llmService: LLMService) { }

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        _context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ],
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                case "askLLM": {
                    try {
                        // Determine which provider to use. 
                        // For this MVP, we use the active one set in LLMService.
                        // You could pass the selected provider from the UI in data.provider
                        const response = await this._llmService.chat(data.value);
                        webviewView.webview.postMessage({
                            type: "addResponse",
                            value: response
                        });
                    } catch (error: any) {
                        webviewView.webview.postMessage({
                            type: "addResponse",
                            value: `Error: ${error.message || error}`
                        });
                    }
                    break;
                }
            }
        });
    }

    public revive(panel: vscode.WebviewView) {
        this._view = panel;
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const styleResetUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
        );
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
        );
        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "main.css")
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, "media", "main.js")
        );

        const nonce = getNonce();

        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<link href="${styleResetUri}" rel="stylesheet">
				<link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
				<title>LLM Copilot</title>
			</head>
			<body>
				<div id="chat-container">
                    <div id="messages"></div>
                    <div id="input-area">
                        <textarea id="prompt-input" placeholder="Ask something..."></textarea>
                        <button id="send-btn">Send</button>
                    </div>
                </div>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}

function getNonce() {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

(function () {
    const vscode = acquireVsCodeApi();

    const messagesContainer = document.getElementById('messages');
    const promptInput = document.getElementById('prompt-input');
    const sendBtn = document.getElementById('send-btn');

    sendBtn.addEventListener('click', () => {
        sendMessage();
    });

    promptInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.type) {
            case 'addResponse':
                addMessage(message.value, 'bot');
                break;
        }
    });

    function sendMessage() {
        const text = promptInput.value;
        if (!text) {
            return;
        }

        addMessage(text, 'user');
        vscode.postMessage({ type: 'askLLM', value: text });
        promptInput.value = '';
    }

    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.textContent = text;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}());

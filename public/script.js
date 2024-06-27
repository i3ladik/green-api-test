async function apiCall(endpoint, data) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    document.getElementById('responseOutput').value = JSON.stringify(result, null, 4);
}

function getSettings() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    apiCall('/api/getSettings', { idInstance, apiTokenInstance });
}

function getStateInstance() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    apiCall('/api/getStateInstance', { idInstance, apiTokenInstance });
}

function sendMessage() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const chatId = document.getElementById('chatId').value;
    const message = document.getElementById('message').value;
    apiCall('/api/sendMessage', { idInstance, apiTokenInstance, chatId, message });
}

function sendFileByUrl() {
    const idInstance = document.getElementById('idInstance').value;
    const apiTokenInstance = document.getElementById('apiTokenInstance').value;
    const chatId = document.getElementById('chatIdFile').value;
    const urlFile = document.getElementById('urlFile').value;
    apiCall('/api/sendFileByUrl', { idInstance, apiTokenInstance, chatId, urlFile });
}

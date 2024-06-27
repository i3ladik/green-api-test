const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const greenApi = axios.create({
    baseURL: 'https://api.green-api.com',
    headers: { 'Content-Type': 'application/json' }
});

app.post('/api/getSettings', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.body;
    await greenApi.get(`/waInstance${idInstance}/getSettings/${apiTokenInstance}`)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json(error.message));
});

app.post('/api/getStateInstance', async (req, res) => {
    const { idInstance, apiTokenInstance } = req.body;

    await greenApi.get(`/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json(error.message));
});

app.post('/api/sendMessage', async (req, res) => {
    const { idInstance, apiTokenInstance, chatId, message } = req.body;

    await greenApi.post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
        chatId,
        message
    }).then(response => res.json(response.data))
        .catch(error => res.status(500).json(error.message));
});

app.post('/api/sendFileByUrl', async (req, res) => {
    const { idInstance, apiTokenInstance, chatId, urlFile } = req.body;

    await greenApi.post(`/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`, {
        chatId,
        urlFile,
        fileName: urlFile.split('/').pop()
    }).then(response => res.json(response.data))
        .catch(error => res.status(500).json(error.message));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

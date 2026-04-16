const fs = require('fs/promises'); // API baseada em Promises [cite: 968, 1061]
const path = require('path');
const FILE_PATH = path.join(__dirname, 'users.json');

async function readDB() {
    try {
        const data = await fs.readFile(FILE_PATH, 'utf-8'); // Pausa a execução até ler [cite: 302]
        return JSON.parse(data);
    } catch (err) {
        return { users: [] };
    }
}

async function writeDB(data) {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDB, writeDB };
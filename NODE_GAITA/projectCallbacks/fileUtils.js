const fs = require('fs'); // Módulo core FS para callbacks [cite: 967]
const path = require('path');
const FILE_PATH = path.join(__dirname, 'users.json');

function readDB(callback) {
    fs.readFile(FILE_PATH, 'utf-8', (err, data) => {
        if (err) return callback({ users: [] }); // Tratamento de erro básico [cite: 1082]
        callback(JSON.parse(data));
    });
}

function writeDB(data, callback) {
    fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), (err) => {
        if (err) console.error("Erro ao gravar ficheiro.");
        callback();
    });
}

module.exports = { readDB, writeDB };
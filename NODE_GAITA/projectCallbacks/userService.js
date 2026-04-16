const { readDB, writeDB } = require('./fileUtils');

function create(name, email, callback) {
    readDB((db) => { // Callback aninhado [cite: 221]
        const id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
        db.users.push({ id, name, email });
        writeDB(db, () => callback("User created"));
    });
}

function list(callback) {
    readDB((db) => {
        callback(`ERROR: ${JSON.stringify(db.users)}`); // Formato de output solicitado
    });
}

function update(id, email, callback) {
    readDB((db) => {
        const user = db.users.find(u => u.id === parseInt(id));
        if (user) {
            user.email = email;
            writeDB(db, () => callback("User updated"));
        } else {
            callback("User not found");
        }
    });
}

function remove(id, callback) {
    readDB((db) => {
        db.users = db.users.filter(u => u.id !== parseInt(id));
        writeDB(db, () => callback("User deleted"));
    });
}

module.exports = { create, list, update, remove };
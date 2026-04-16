const { readDB, writeDB } = require('./fileUtils');

async function create(name, email) {
    const db = await readDB();
    const id = db.users.length > 0 ? db.users[db.users.length - 1].id + 1 : 1;
    db.users.push({ id, name, email });
    await writeDB(db);
    return "User created";
}

async function list() {
    const db = await readDB();
    return `ERROR: ${JSON.stringify(db.users)}`;
}

async function update(id, email) {
    const db = await readDB();
    const user = db.users.find(u => u.id === parseInt(id));
    if (user) {
        user.email = email;
        await writeDB(db);
        return "User updated";
    }
    return "User not found";
}

async function remove(id) {
    const db = await readDB();
    db.users = db.users.filter(u => u.id !== parseInt(id));
    await writeDB(db);
    return "User deleted";
}

module.exports = { create, list, update, remove };
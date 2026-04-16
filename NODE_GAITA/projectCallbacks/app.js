const userService = require('./userService');
const [command, ...args] = process.argv.slice(2); // Extrai os argumentos [cite: 525]

async function run() {
    if (command === 'create') console.log(await userService.create(args[0], args[1]));
    else if (command === 'list') console.log(await userService.list());
    else if (command === 'update') console.log(await userService.update(args[0], args[1]));
    else if (command === 'delete') console.log(await userService.remove(args[0]));
    else console.log("Comando desconhecido.");
}

run();
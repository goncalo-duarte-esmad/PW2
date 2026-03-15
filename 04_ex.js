const http = require('http'); // Importa o módulo core HTTP [cite: 743, 744]
const PORT = 3000; // Define a porta do servidor [cite: 746]
const HOST = 'localhost'; // Define o endereço do servidor [cite: 745]

const server = http.createServer((req, res) => {
    const { method, url } = req; // Extrai o método e a URL do objeto de pedido (request) [cite: 844, 849]

    if (method !== "GET") {
        // Correção: Uso de chavetas { } para o objeto e hífen em 'Content-Type'
        res.writeHead(405, { "Content-Type": "text/plain" });
        return res.end("Method Not Allowed");
    }

    // Implementação utilizando if e else if conforme solicitado
    if (url === '/') {
        // Alínea a: Responde com status 200 (OK) e a mensagem de boas-vindas [cite: 750, 751]
        res.writeHead(200);
        res.end('<h1>Welcome to my server!</h1>');
    }
    else if (url === '/about') {
        // Alínea b: Responde com status 200 e a descrição do servidor [cite: 862]
        res.writeHead(200);
        res.end('<h1>This is a Node.js server</h1>');
    }
    else if (url === '/time') {
        // Alínea c: Responde com a hora atual utilizando o método dinâmico do JavaScript
        res.writeHead(200);
        res.end(`<h1>Current time: ${new Date().toLocaleString()}</h1>`);
    }
    else {
        // Caso a rota não exista, envia o código 404 (Not Found) [cite: 942, 1114]
        res.writeHead(404);
        res.end('<h1>Route not found</h1>');
    }
});

// Coloca o servidor em modo de escuta para pedidos recebidos [cite: 754, 755, 828]
server.listen(PORT, HOST, () => {
    // Imprime no terminal a confirmação de que o servidor está a correr [cite: 758, 837]
    console.log(`Node server running on http://${HOST}:${PORT}/`);
});
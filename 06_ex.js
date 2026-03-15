const http = require('http'); // Importa o módulo HTTP [cite: 744, 807]
const fs = require('fs'); // Importa o módulo File System [cite: 966, 969]

const server = http.createServer((req, res) => {
    const { method, url } = req; // Extrai o método e a URL [cite: 844, 849]

    // Servir a página HTML com o formulário (GET /)
    if (url === '/' && method === 'GET') {
        res.setHeader('Content-Type', 'text/html; charset=utf-8'); // Define o cabeçalho [cite: 868]
        res.writeHead(200); // Status OK [cite: 750]
        return res.end(`
            <html><body>
                <form action='/message' method='POST'>
                    <input type='text' name='message' required>
                    <button type='submit'>Send</button>
                </form>
            </body></html>
        `);
    }

    // Alínea a: Lidar com o pedido POST em /message
    if (url === '/message' && method === 'POST') {
        const body = [];

        // Ouve o fluxo de dados (chunks) do corpo do pedido
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        // Quando o corpo termina de ser recebido
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // Junta os chunks [cite: 1112]
            // O formato recebido é "message=conteudo+da+mensagem"
            const message = parsedBody.split('=')[1].replace(/\+/g, ' ');

            // Adiciona a mensagem ao ficheiro messages.txt (Append)
            fs.appendFile('messages.txt', message + '\n', (err) => {
                if (err) {
                    res.writeHead(500);
                    return res.end('Erro ao guardar a mensagem');
                }

                // Alínea b: Redirecionar para a homepage (302)
                res.writeHead(302, { 'Location': '/' }); // Define o status e o cabeçalho de redirecionamento [cite: 861]
                return res.end(); // Finaliza a resposta [cite: 863]
            });
        });
    }

    // Rota não encontrada
    res.writeHead(404);
    res.end('Página não encontrada');
});

server.listen(3000, () => {
    console.log('Servidor a correr em http://localhost:3000/');
});
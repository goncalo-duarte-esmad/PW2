const http = require('http'); // Importa o módulo core HTTP [cite: 807]
const userService = require('./userService'); // Importa a lógica CRUD [cite: 670, 678]

const PORT = 5000;

const server = http.createServer(async (req, res) => {
    const { method, url } = req; // Obtém o método e a URL [cite: 849]
    res.setHeader('Content-Type', 'application/json; charset=utf-8'); // Define resposta como JSON [cite: 861]

    // Função auxiliar para ler o corpo (body) do pedido POST/PUT/DELETE
    const getRequestBody = (request) => {
        return new Promise((resolve, reject) => {
            let body = '';
            request.on('data', chunk => { body += chunk.toString(); }); // Coleta os dados [cite: 124]
            request.on('end', () => { resolve(JSON.parse(body || '{}')); }); // Finaliza a leitura
            request.on('error', (err) => { reject(err); });
        });
    };

    try {
        // Roteamento baseado nos Verbos HTTP [cite: 933, 934]
        if (url === '/users') {
            switch (method) {
                case 'GET': // LISTAR UTILIZADORES
                    const usersList = await userService.list();
                    res.writeHead(200);
                    res.end(usersList);
                    break;

                case 'POST': // CRIAR UTILIZADOR
                    const { name, email } = await getRequestBody(req);
                    const createMsg = await userService.create(name, email);
                    res.writeHead(201); // 201 Created
                    res.end(JSON.stringify({ message: createMsg }));
                    break;

                case 'PUT': // ATUALIZAR UTILIZADOR
                    const updateData = await getRequestBody(req);
                    const updateMsg = await userService.update(updateData.id, updateData.email);
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: updateMsg }));
                    break;

                case 'DELETE': // ELIMINAR UTILIZADOR
                    const deleteData = await getRequestBody(req);
                    const deleteMsg = await userService.remove(deleteData.id);
                    res.writeHead(200);
                    res.end(JSON.stringify({ message: deleteMsg }));
                    break;

                default:
                    res.writeHead(405); // Method Not Allowed
                    res.end(JSON.stringify({ error: 'Método não suportado' }));
            }
        } else {
            res.writeHead(404); // Rota não encontrada [cite: 942]
            res.end(JSON.stringify({ error: 'Rota não encontrada' }));
        }
    } catch (err) {
        res.writeHead(500); // Erro interno do servidor
        res.end(JSON.stringify({ error: 'Erro no processamento dos dados' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor API a correr em http://localhost:${PORT}/users`); // [cite: 837]
});
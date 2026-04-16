const http = require('http'); // Importa o módulo core HTTP [cite: 743, 744, 807]
const fs = require('fs'); // Módulo para manipular o sistema de ficheiros [cite: 737, 966]
const path = require('path'); // Módulo para lidar com caminhos de diretórios [cite: 737, 1156]

const PORT = 5000; // Porto definido no enunciado e visível nas imagens
const HOST = 'localhost'; // Endereço local [cite: 745]

const server = http.createServer((req, res) => {
    // 1. Obter a query string (ex: ?file=WebProgII.html) [cite: 883, 888]
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const fileName = parsedUrl.searchParams.get('file'); // [cite: 889]

    const publicDir = path.join(__dirname, 'public'); // Diretório base [cite: 1159, 1213]

    // Caso A: Rota raiz "/" sem parâmetros (Imagem 1)
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>Welcome!</h1>');
    }

    // Caso B: Tentativa de aceder via caminho direto sem a key "file" (Imagem 3)
    // Se a URL não for a raiz e não tiver o parâmetro ?file=
    if (!fileName) {
        res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>Bad Request</h1><p>key FILE not found in request</p>');
    }

    // 2. Construir e validar o caminho do ficheiro (Segurança contra Path Traversal) [cite: 1209, 1213]
    const filePath = path.join(publicDir, fileName);

    // Garante que o ficheiro está dentro da pasta pública [cite: 1215]
    if (!filePath.startsWith(publicDir)) {
        res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
        return res.end('<h1>403 Forbidden</h1>'); // [cite: 1218, 1231]
    }

    // 3. Tentar ler o ficheiro solicitado (Imagem 2 e 4)
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Se o ficheiro não existir, listar os disponíveis (Imagem 4) [cite: 1114]
            return listAvailableFiles(res, publicDir);
        }

        // Ficheiro encontrado com sucesso
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
    });
});

// Função para gerar a página de erro 404 com a lista (Imagem 4)
function listAvailableFiles(res, dir) {
    fs.readdir(dir, (err, files) => { // Lê o conteúdo do diretório [cite: 971]
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        let html = '<h1>404 Not Found</h1><p>File not found.</p><p>Available files:</p><ul>';

        if (!err && files) {
            files.forEach(file => {
                // Gera os links no formato esperado: /?file=nome_do_ficheiro
                html += `<li><a href="/?file=${file}">${file}</a></li>`;
            });
        }

        html += '</ul>';
        res.end(html);
    });
}

// Inicia o servidor no porto 5000 [cite: 755, 828]
server.listen(PORT, HOST, () => {
    console.log(`Node server running on http://${HOST}:${PORT}/`); // [cite: 758, 837]
});
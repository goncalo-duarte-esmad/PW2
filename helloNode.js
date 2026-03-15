//console.log("HellofromNode");

//arguments passed to the script
//console.log(process.argv)

//enviorement variables
//const PORT = process.env.PORT || 3000;
//console.log('Server will run on port ${PORT}')

//add two numbers passed as arguments

    //const num1 = parseInt(process.argv[2])
    //const num2 = parseInt(process.argv[3])
    //const sum = num1 + num2
    //console.log('The sum of ${num1} and ${num2} is ${sum}')

//create web server
const http = require('http');
const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello, World</h1>')

});

server.listen(PORT, HOST, () => {
console.log(`Node server running on http://${HOST}:${PORT}/`)
});
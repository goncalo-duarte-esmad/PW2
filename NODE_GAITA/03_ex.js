// ex3.js
const math = require('./03_module.js');

// Extrair argumentos ignorando os caminhos padrão [cite: 525]
const args = process.argv.slice(2);

// 1. Verificar se existem argumentos suficientes
if (args.length < 3) {
    console.log("ERROR: Not enough operators! USAGE: node ex3 <operation> <number1> <number2>");
    process.exit(1);
}

const [operation, val1, val2] = args;
const num1 = Number(val1);
const num2 = Number(val2);

// 2. Verificar se a operação é suportada
if (!math[operation]) {
    console.log("ERROR: Invalid operation! Supported operations are: +, -, *, /");
    process.exit(1);
}

// 3. Verificar se os inputs são números válidos
if (isNaN(num1) || isNaN(num2)) {
    console.log("ERROR: Arguments must be valid numbers");
    process.exit(1);
}

// 4. Executar a operação
const result = math[operation](num1, num2);

// 5. Exibir o resultado ou a mensagem de erro específica (ex: divisão por zero)
if (typeof result === 'string') {
    console.log(result);
} else {
    console.log(`${num1} ${operation} ${num2} = ${result}`);
}
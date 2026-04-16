const num1 = parseInt(process.argv[2])
const num2 = parseInt(process.argv[3])
const sum = num1 + num2
if (process.argv[2] === "" || process.argv[3] === "") {
    console.log("Por favor insira argumentos com algo");
} else if (isNaN(num1) || isNaN(num2)) {
    console.log("Por favor insira numeros");
} else {
    console.log(`The sum of ${num1} and ${num2} is ${sum}`)
}
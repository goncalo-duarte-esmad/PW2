function add (a, b) {
        return a + b
}

function sub (a, b) {
        return a - b
}

function mult (a, b){
    return a * b

}

function div (a, b){
    if (b === 0)
        return `ERROR: Cannot divide by zero!`
}

module.exports = {
    '+': add,
    '-': sub,
    '*': mult,
    '/': div
};
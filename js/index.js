function initialTheme() {
    const preTheme = localStorage.getItem('calculatorTheme')
    if(preTheme) {
        document.documentElement.className = preTheme;
        return
    }
    if(window.matchMedia("(prefers-color-scheme: light)").matches) document.documentElement.className = 'second';
}
initialTheme()

const toggleFirst = document.getElementById('toggle-first')
const toggleSecond = document.getElementById('toggle-second')
const toggleThird = document.getElementById('toggle-third')
const gridButton = document.querySelectorAll('.grid__button')
const textResult = document.getElementById('result')

let operation = ''

const operators = ['+', '-', 'x', '/']
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

toggleFirst.addEventListener("click", () => changeTheme('first'))
toggleSecond.addEventListener("click", () => changeTheme('second'))
toggleThird.addEventListener("click", () => changeTheme('third'))

gridButton.forEach(button => {
    button.addEventListener("click", calculate)
})

function changeTheme(theme) {
    localStorage.setItem('calculatorTheme', theme)
    document.documentElement.className = theme;
}

function calculate(e) {
    if(e.target.textContent === 'reset') operation = ''
    else if(e.target.textContent === 'del') operation = operation.slice(0, operation.length-1)
    else if(e.target.textContent === '=') {
        if(!operators.includes(operation[operation.length-1]) && operation) {
            const result = (Function("return " + operation)()).toString()
            operation = (result === 'Infinity') ? '' : result
        }
    }
    else if(operators.includes(e.target.textContent)) {
        if(numbers.includes(operation[operation.length-1])) {
            operation += e.target.textContent === 'x' ? '*' : e.target.textContent
        }
    }
    else if(numbers.includes(e.target.textContent)) operation += e.target.textContent
    else if(e.target.textContent === '.') {
        let num = operation.split(/[-\+\*\/]+/)
        if(num[num.length-1].indexOf('.') < 0) operation += e.target.textContent
    }
    textResult.textContent = operation.length ? operation : '0'
}
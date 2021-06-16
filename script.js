class Calculator {
    constructor(inputText) {
        this.inputText = inputText
        this.clear()
    }

    clear() {
        this.secondInput = ''
        this.firstInput = ''
        this.operation = undefined
    }

    appendNumber(number) {
        if (number === '.' && this.secondInput.includes('.')) return
        this.secondInput = this.secondInput + number
    }

    chooseOperation(operation) {
        if (this.secondInput === '') return
        if (this.firstInput !== '') {
            this.result()
        }
        this.operation = operation
        this.firstInput = this.secondInput
        this.secondInput = ''
    }

    result() {
        let result
        const prev = parseFloat(this.firstInput)
        const current = parseFloat(this.secondInput)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '/':
                result = prev / current
                break
            default:
                break
        }
        this.secondInput = result
        this.operation = undefined
        this.firstInput = ''
    }

    updateDisplay() {
        if (this.operation != null) {
            this.inputText.innerText = `${this.firstInput} ${this.operation} ${this.secondInput}`
            document.getElementById("screen").value = this.inputText.innerText
        } else {
            this.inputText.innerText = `${this.secondInput}`
            document.getElementById("screen").value = this.inputText.innerText
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const inputText = document.querySelectorAll('[data-input]')

const calculator = new Calculator(inputText)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.result()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        calculator.appendNumber(e.key)
        calculator.updateDisplay()
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        calculator.chooseOperation(e.key)
        calculator.updateDisplay()
    } else if (e.key === "Enter" || e.key === "=") {
        calculator.result()
        calculator.updateDisplay()
    } else if (e.key === "Delete") {
        calculator.clear()
        calculator.updateDisplay()
    }
});
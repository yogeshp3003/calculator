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
        this.secondInput = this.secondInput.toString() + number.toString()
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

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        if (this.operation != null) {
            this.inputText.innerText =
                `${this.getDisplayNumber(this.firstInput)} ${this.operation} ${this.getDisplayNumber(this.secondInput)}`
        } else {
            this.inputText.innerText = `${ this.getDisplayNumber(this.secondInput)}`
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-all-clear]')
const inputText = document.querySelector('[data-first-input]')

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
//Abertura e fechamento de Nova Transação

const Modal = {
    open() {
        //abrir o modal
        //adicionar a class active ao modal
        document
            .querySelector('.modal-overlay')
            .classList.add('active')
    },
    close() {
        //fechar o modal
        //remover a class active do modal
        document
            .querySelector('.modal-overlay')
            .classList.remove('active')
    }
}

// Valores das transações: tabela

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 500000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 200000,
        date: '23/01/2021',
    },
];

/*
    Eu preciso somar as entradas 
    Depois eu preciso somar as saídas
    Depois remover das entradas o valor das saídas
    Assim, eu terei o total
*/

const Transaction = {
    incomes() {
        let income = 0;
        //pegar todas as transações 
        //e para cada transação,
        transactions.forEach(transaction => {
            //se for maior que zero 
            if(transaction.amount > 0) {
                //somar a uma variavel e retornar a variável 
                income += transaction.amount;
                 // igual a income = income + transaction.amount
            }      
        })        
        return income;
    },
    expenses() {
        let expense = 0;
        //pegar todas as transações 
        //e para cada transação,
        transactions.forEach(transaction => {
            //se for menor que zero 
            if(transaction.amount < 0) {
                //somar a uma variavel e retornar a variável 
                expense += transaction.amount;
                 // igual a expense = expense + transaction.amount
            }          
        })        
        return expense;
    },
    total() {
        return "Discover"
    }
}

/*
    Eu preciso substituir os dados do HTML com os dados do JS

    Estavam todos descritos manualmente no HTML na tag <tbody>
*/
//criando elemento responsável por criar transações

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação">
            </td>
         `
         return html
    },
    //atualização dos cards de entradas, saídas e total
    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Transaction.incomes()
        document
            .getElementById('expenseDisplay')
            .innerHTML = Transaction.expenses()
        document
            .getElementById('totalDisplay')
            .innerHTML = Transaction.total()
    }
}

const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
       
        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency", 
            currency: "BRL"
        })

        return signal + value
    }
}

//para cada transação rode uma funcionalidade. 
transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
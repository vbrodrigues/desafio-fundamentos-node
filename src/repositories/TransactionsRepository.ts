import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncome = this.transactions.reduce((total, current) => {
      if (current.type === 'income') {
        return total + current.value;
      }
      return total;
    }, 0);

    const totalOutcome = this.transactions.reduce((total, current) => {
      if (current.type === 'outcome') {
        return total + current.value;
      }
      return total;
    }, 0);

    const total = totalIncome - totalOutcome;

    const balance = { income: totalIncome, outcome: totalOutcome, total };
    return balance;

  }

  public create( transactionData: CreateTransactionDTO): Transaction {
    const { title, value, type } = transactionData;
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;

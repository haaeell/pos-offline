// src/App.js
import React, { useState, useEffect } from 'react';
import { addTransaction, getTransactions, clearTransactions } from './idb';
import './App.css';

function App() {
    const [transactions, setTransactions] = useState([]);
    const [transaction, setTransaction] = useState('');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = async () => {
        const storedTransactions = await getTransactions();
        setTransactions(storedTransactions);
    };

    const handleAddTransaction = async () => {
        await addTransaction({ text: transaction, date: new Date().toISOString() });
        setTransaction('');
        loadTransactions();
    };

    const handleClearTransactions = async () => {
        await clearTransactions();
        loadTransactions();
    };

    return (
        <div className="container">
            <h1>Offline POS</h1>
            <input
                type="text"
                value={transaction}
                onChange={(e) => setTransaction(e.target.value)}
                placeholder="Enter transaction"
            />
            <button 
                onClick={handleAddTransaction}
                disabled={!transaction.trim()}
            >
                Add Transaction
            </button>
            <button onClick={handleClearTransactions}>Clear Transactions</button>

            <h2>Stored Transactions</h2>
            <ul>
                {transactions.map((t, index) => (
                    <li key={index}>
                        <span>{t.text}</span>
                        <span>{new Date(t.date).toLocaleString()}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

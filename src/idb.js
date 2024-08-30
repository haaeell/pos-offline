// src/idb.js
import { openDB } from 'idb';

const dbPromise = openDB('offline-pos-db', 1, {
    upgrade(db) {
        db.createObjectStore('transactions', {
            keyPath: 'id',
            autoIncrement: true,
        });
    },
});

export async function addTransaction(transaction) {
    const db = await dbPromise;
    return db.add('transactions', transaction);
}

export async function getTransactions() {
    const db = await dbPromise;
    return db.getAll('transactions');
}

export async function clearTransactions() {
    const db = await dbPromise;
    return db.clear('transactions');
}

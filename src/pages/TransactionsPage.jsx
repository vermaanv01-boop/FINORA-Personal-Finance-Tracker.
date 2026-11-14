import React from 'react';
import { useOutletContext } from 'react-router-dom';
import TransactionsView from '../sections/TransactionsView';

export default function TransactionsPage() {
  const { 
    finance, 
    currency, 
    onOpenAddModal, 
    onEditTransaction, 
    onDeleteTransaction 
  } = useOutletContext();

  return (
    <TransactionsView 
      transactions={finance.transactions}
      currency={currency}
      onOpenAddModal={onOpenAddModal}
      onEditTransaction={onEditTransaction}
      onDeleteTransaction={onDeleteTransaction}
    />
  );
}

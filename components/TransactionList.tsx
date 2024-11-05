import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem } from 'react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  merchant: string;
}

type TransactionCardProps = {
  transaction: Transaction;
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: -82.50,
    date: '2024-11-05',
    category: 'Food',
    merchant: 'Whole Foods'
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 3500.00,
    date: '2024-11-04',
    category: 'Income',
    merchant: 'Company Corp'
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: -15.99,
    date: '2024-11-03',
    category: 'Entertainment',
    merchant: 'Netflix'
  },
  {
    id: '4',
    title: 'Gas Station',
    amount: -45.30,
    date: '2024-11-02',
    category: 'Transportation',
    merchant: 'Shell'
  },
  {
    id: '5',
    title: 'Restaurant',
    amount: -65.20,
    date: '2024-11-01',
    category: 'Food',
    merchant: 'Local Bistro'
  }
];

const TransactionCard: React.FC<TransactionCardProps> = ({ transaction }) => {
  const { title, amount, date, category, merchant } = transaction;
  const isExpense = amount < 0;

  return (
    <View style={styles.card}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.merchant}>{merchant}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[
          styles.amount,
          { color: isExpense ? '#FF4444' : '#4CAF50' }
        ]}>
          ${Math.abs(amount).toFixed(2)}
        </Text>
        <Text style={styles.date}>{new Date(date).toLocaleDateString()}</Text>
      </View>
    </View>
  );
};

const TransactionList: React.FC = () => {
  const renderItem: ListRenderItem<Transaction> = ({ item }) => (
    <TransactionCard transaction={item} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>
      <FlatList<Transaction>
        data={mockTransactions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  merchant: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default TransactionList;
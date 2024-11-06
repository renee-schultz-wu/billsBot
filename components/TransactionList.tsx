import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem, Image, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

interface Transaction {
  id: number;
  createdAt: string;
  updatedAt: string;
  usingType: string;
  userId: number;
  transactionAt: string;
  transactionType: string;
  counterpartyName: string;
  category: string;
  description: string;
  paymentMethod: string;
  totalAmount: number;
  receiptImage: string;
  accountInfo: string;
  transactionReferenceNumber: string;
  currency: string;
  location: string;
  notes: string;
  tags: string;
  recurring: boolean;
  reimbursable: boolean;
}

interface TransactionListScreenProps {
    apiUrl: string;  // Pass the API URL as a prop
}

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const {
    transactionAt,
    counterpartyName,
    category,
    description,
    totalAmount,
    currency,
    paymentMethod,
    location,
    tags
  } = transaction;

  const formattedDate = new Date(transactionAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(totalAmount);
  
  return (
    <View style={styles.card}>
      <View style={styles.mainContent}>
        <View style={styles.leftContent}>
          <Text style={styles.title}>{counterpartyName}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.detailsRow}>
            <Text style={styles.category}>{category}</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.paymentMethod}>{paymentMethod}</Text>
          </View>

          <Text style={styles.location}>{location}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.amount}>{formattedAmount}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};


const TransactionListScreen: React.FC<TransactionListScreenProps> = ({ apiUrl }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetchTransactions();
    }, []);
  
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
  
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching transactions:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    const renderItem: ListRenderItem<Transaction> = ({ item }) => (
      <TransactionCard transaction={item} />
    );
  
    if (isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
  
    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
      );
    }
  
    if (transactions.length === 0) {
      return (
        <View style={styles.container}>
          <Text>No transactions found</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Transactions</Text>
        <FlatList<Transaction>
          data={transactions}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={fetchTransactions}
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
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    mainContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftContent: {
      flex: 1,
      marginRight: 12,
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
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    detailsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    category: {
      fontSize: 12,
      color: '#888',
    },
    dot: {
      fontSize: 12,
      color: '#888',
      marginHorizontal: 4,
    },
    paymentMethod: {
      fontSize: 12,
      color: '#888',
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 8,
    },
    tag: {
      backgroundColor: '#f0f0f0',
      borderRadius: 12,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginRight: 8,
      marginBottom: 4,
    },
    tagText: {
      fontSize: 12,
      color: '#666',
    },
    location: {
      fontSize: 12,
      color: '#888',
    },
    amount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    date: {
      fontSize: 12,
      color: '#888',
    },
});

export default TransactionListScreen;
import React from 'react';
import { View, Text, FlatList, StyleSheet, ListRenderItem, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    apiUrl: string;
}

const TransactionCard: React.FC<{ transaction: Transaction }> = ({ transaction }) => {
  const {
    transactionAt,
    counterpartyName,
    category,
    totalAmount,
    currency,
  } = transaction;

  const formattedDate = new Date(transactionAt).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(totalAmount);

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons name="bag-outline" size={24} color="white" style={styles.icon} />
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.title}>{counterpartyName}</Text>
        <Text style={styles.time}>{formattedDate}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.amount}>{formattedAmount}</Text>
        <Ionicons name="arrow-up-outline" size={20} color="#4A90E2" />
      </View>
    </View>
  );
};

const TransactionListScreen: React.FC<TransactionListScreenProps> = ({ apiUrl }) => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
  
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
  
    const filteredTransactions = transactions.filter(transaction =>
      transaction.counterpartyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
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
  
    return (
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filters Section */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="calendar-outline" size={18} color="#000" />
            <Text style={styles.filterText}>Date April - May</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="list-outline" size={18} color="#000" />
            <Text style={styles.filterText}>Catalog All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Transaction List */}
        <FlatList<Transaction>
          data={filteredTransactions}
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
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 10,
      marginBottom: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    filterText: {
      marginLeft: 8,
      fontSize: 14,
      color: '#333',
    },
    addButton: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    card: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#4A90E2',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 16,
    },
    icon: {
      color: 'white',
    },
    mainContent: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
    time: {
      fontSize: 12,
      color: '#888',
    },
    rightContent: {
      alignItems: 'flex-end',
    },
    amount: {
      fontSize: 16,
      fontWeight: '600',
      color: '#333',
      marginBottom: 4,
    },
});

export default TransactionListScreen;

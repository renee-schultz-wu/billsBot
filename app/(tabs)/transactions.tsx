import { View, Text, TextInput, FlatList, RefreshControl } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '@/config/constants';

// Define transaction type
interface Transaction {
  id: string;
  category: string;
  createdAt: string;
  totalAmount: number;
  transactionType: string;
  name?: string;
}

// Add this function before the TransactionsScreen component
const getIconName = (category: string): keyof typeof Ionicons.glyphMap => {
  switch (category) {
    // 支出类别 (Outcome)
    case 'FOOD_AND_DINING':
      return 'restaurant-outline';
    case 'SHOPPING':
      return 'cart-outline';
    case 'TRANSPORTATION':
      return 'car-outline';
    case 'HOUSING':
      return 'home-outline';
    case 'ENTERTAINMENT_AND_RECREATION':
      return 'game-controller-outline';
    case 'HEALTH_AND_INSURANCE':
      return 'medical-outline';
    case 'EDUCATION_AND_TRAINING':
      return 'school-outline';
    case 'COMMUNICATION_AND_TECHNOLOGY':
      return 'wifi-outline';
    case 'GIFTS_AND_DONATIONS':
      return 'gift-outline';
    case 'FAMILY_OBLIGATIONS':
      return 'people-outline';
    case 'DEBT_AND_SAVINGS':
      return 'wallet-outline';
    case 'TAXES':
      return 'receipt-outline';
    case 'OTHER_EXPENSE':
      return 'ellipsis-horizontal-outline';
      
    // 收入类别 (Income)
    case 'Salary':
      return 'cash-outline';
    case 'Bonuses and Allowances':
      return 'trophy-outline';
    case 'Investment Income':
      return 'trending-up-outline';
    case 'Side Income':
      return 'briefcase-outline';
    case 'Gifts and Inheritance':
      return 'gift-outline';
    case 'Other Income':
      return 'ellipsis-horizontal-outline';
      
    default:
      return 'ellipsis-horizontal-outline';
  }
};

// 添加日期格式化函数
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[date.getMonth()]} ${date.getDate()}  ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

// 添加这个函数来获取颜色
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    'FOOD_AND_DINING': '#FF6B6B',
    'SHOPPING': '#4ECDC4',
    'TRANSPORTATION': '#45B7D1',
    'HOUSING': '#96CEB4',
    'ENTERTAINMENT_AND_RECREATION': '#FFEEAD',
    'HEALTH_AND_INSURANCE': '#D4A5A5',
    'EDUCATION_AND_TRAINING': '#9B59B6',
    'COMMUNICATION_AND_TECHNOLOGY': '#3498DB',
    'GIFTS_AND_DONATIONS': '#E74C3C',
    'FAMILY_OBLIGATIONS': '#2ECC71',
    'DEBT_AND_SAVINGS': '#F1C40F',
    'TAXES': '#95A5A6',
    'OTHER_EXPENSE': '#7F8C8D',
    'Salary': '#27AE60',
    'Bonuses and Allowances': '#F39C12',
    'Investment Income': '#16A085',
    'Side Income': '#8E44AD',
    'Gifts and Inheritance': '#D35400',
    'Other Income': '#7F8C8D'
  };
  
  return colorMap[category] || '#7F8C8D'; // 默认颜色
};

export default function TransactionsScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/transaction/getAll`);
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchTransactions();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#666"
        />
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <View style={[styles.filterItem, { marginRight: 4 }]}>
          <Ionicons name="calendar-outline" size={18} color="#666" />
          <Text style={styles.filterLabel}>Date</Text>
          <Text style={styles.filterValue}>April - May</Text>
        </View>
        
        <View style={styles.filterItem}>
          <Ionicons name="grid-outline" size={18} color="#666" />
          <Text style={styles.filterLabel}>Catalog</Text>
          <Text style={styles.filterValue}>All</Text>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item: transaction }) => (
          <View style={styles.transactionItem}>
            <View style={styles.leftContent}>
              <View style={[
                styles.iconContainer,
                transaction.transactionType === 'income' ? styles.incomeIcon : styles.outcomeIcon
              ]}>
                <Ionicons 
                  name={getIconName(transaction.category)}
                  size={24} 
                  color="#fff" 
                />
              </View>
              <View>
                <Text style={styles.transactionType}>
                  {transaction.name || transaction.category}
                </Text>
                <Text style={styles.transactionTime}>
                  {formatDate(transaction.createdAt)}
                </Text>
              </View>
            </View>
            <Text style={[
              styles.amount,
              transaction.transactionType === 'income' ? styles.incomeAmount : styles.outcomeAmount
            ]}>
              {transaction.transactionType === 'income' ? '+' : '-'}
              ${Math.abs(transaction.totalAmount).toFixed(2)}
            </Text>
          </View>
        )}
        style={styles.transactionList}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#5063BF"
            colors={['#5063BF']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 56,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 58,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    gap: 4,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  filterValue: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  transactionList: {
    flexGrow: 1,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
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
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shoppingIcon: {
    backgroundColor: '#5B8FF9',
  },
  foodIcon: {
    backgroundColor: '#5AD8A6',
  },
  transferIcon: {
    backgroundColor: '#F6BD16',
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  transactionTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4444ff',
  },
  incomeAmount: {
    color: '#878787',
  },
  outcomeAmount: {
    color: '#5164BF',
  },
  // 支出类图标颜色
  FOOD_AND_DINING: { backgroundColor: '#FF6B6B' },
  SHOPPING: { backgroundColor: '#4ECDC4' },
  TRANSPORTATION: { backgroundColor: '#45B7D1' },
  HOUSING: { backgroundColor: '#96CEB4' },
  ENTERTAINMENT_AND_RECREATION: { backgroundColor: '#FFEEAD' },
  HEALTH_AND_INSURANCE: { backgroundColor: '#D4A5A5' },
  EDUCATION_AND_TRAINING: { backgroundColor: '#9B59B6' },
  COMMUNICATION_AND_TECHNOLOGY: { backgroundColor: '#3498DB' },
  GIFTS_AND_DONATIONS: { backgroundColor: '#E74C3C' },
  FAMILY_OBLIGATIONS: { backgroundColor: '#2ECC71' },
  DEBT_AND_SAVINGS: { backgroundColor: '#F1C40F' },
  TAXES: { backgroundColor: '#95A5A6' },
  OTHER_EXPENSE: { backgroundColor: '#7F8C8D' },
  
  // 收入图标颜色
  Salary: { backgroundColor: '#27AE60' },
  'Bonuses and Allowances': { backgroundColor: '#F39C12' },
  'Investment Income': { backgroundColor: '#16A085' },
  'Side Income': { backgroundColor: '#8E44AD' },
  'Gifts and Inheritance': { backgroundColor: '#D35400' },
  'Other Income': { backgroundColor: '#7F8C8D' },
  // 新增收入支出的图标背景色
  outcomeIcon: {
    backgroundColor: '#5063BF',  // 更新为设计稿中的颜色
  },
  incomeIcon: {
    backgroundColor: '#8EDFEB',  // 浅蓝色
  },

  //5063BF: dark blue / A7B8F2:mid blue / 8EDFEB: light blue
});

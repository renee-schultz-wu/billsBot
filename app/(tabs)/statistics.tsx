import { Image, StyleSheet, Platform, Button, FlatList, View } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import DataVisualization from '@/components/DataVisualization';
import { ScrollView } from 'react-native-gesture-handler';

// 定义 StatCard 属性的接口
interface StatCardProps {
  title: string;
  amount: string;
  style?: any; // 或者使用更具体的 StyleProp<ViewStyle> 类型
}

// 修改 StatCard 组件
const StatCard = ({ title, amount, style }: StatCardProps) => (
  <ThemedView style={[styles.statCard, style]}>
    <View style={styles.cardHeader}>
      <ThemedText style={[
        styles.cardTitle,
        title === 'Expense' && { color: '#333' }
      ]}>
        {title}
      </ThemedText>
      {title !== 'Balance' && (
        <MaterialIcons 
          name={title === 'Income' ? 'arrow-downward' : 'arrow-upward'} 
          size={16} 
          color={title === 'Expense' ? '#333' : '#fff'} 
        />
      )}
    </View>
    <ThemedText style={[
      styles.cardAmount,
      title === 'Expense' && { color: '#333' }
    ]}>
      ${amount}
    </ThemedText>
  </ThemedView>
);

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerImage={
        <View style={styles.headerContent}>
          <View style={styles.tabBar}>
            <ThemedText style={styles.activeTab}>Statistics</ThemedText>
            <ThemedText style={styles.inactiveTab}>Recommendations</ThemedText>
          </View>
          <View style={styles.statsContainer}>
            <StatCard title="Balance" amount="8,000" style={styles.balanceCard} />
            <StatCard title="Income" amount="20,000" style={styles.incomeCard} />
            <StatCard title="Expense" amount="6,000" style={styles.expenseCard} />
          </View>
        </View>
      }
      headerBackgroundColor={{ light: '#fff', dark: '#000' }}>
      <ThemedView style={styles.stepContainer}>
        <DataVisualization style={{ width: '100%', minWidth: 200 }} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginTop: -100,
  },

  headerContent: {
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tabBar: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 8,
    marginRight: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  inactiveTab: {
    fontSize: 16,
    color: '#808080',
    paddingBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
  },
  statCard: {
    padding: 16,
    borderRadius: 16,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardIcon: {
    width: 16,
    height: 16,
  },
  balanceCard: {
    backgroundColor: '#333',
  },
  incomeCard: {
    backgroundColor: '#5063BF',
  },
  expenseCard: {
    backgroundColor: '#8EDFEB',
    color: '#333',
  },
  cardTitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  cardAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
import { StyleSheet, Platform, Button, FlatList } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import DataVisualization from '@/components/DataVisualization';

// 添加这个接口定义
interface Transaction {
  id: number;
  // 添加其他交易相关的属性
}

export default function HomeScreen() {
  // const [transactions, setTransactions] = useState([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://40.82.180.34:8080/transaction/getAll');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('获取交易数据失败:', error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>

      <ThemedView style={styles.stepContainer}>
        <DataVisualization></DataVisualization>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <Button title="获取交易数据" onPress={fetchTransactions} />
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedText>{JSON.stringify(item)}</ThemedText>
          )}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});

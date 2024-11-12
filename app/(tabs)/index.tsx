import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Feather';

const FinanceDashboard = () => {
  const [activePeriod, setActivePeriod] = useState('daily');

  // Sample data for different periods
  const chartData = {
    daily: {
      labels: ['01', '10', '20', '30'],
      datasets: [{
        data: [1875, 1500, 2250, 3000],
      }],
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        data: [8000, 6500, 7500, 9000],
      }],
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{
        data: [25000, 28000, 32000, 30000],
      }],
    },
  };

  // Function to handle period change
  const handlePeriodChange = (period) => {
    setActivePeriod(period.toLowerCase());
  };

  // Get current period's data
  const currentChartData = chartData[activePeriod];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              source={require('@/assets/images/avatar-placeholder.png')}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.title}>Jason, Welcome Back</Text>
              <Text style={styles.subtitle}>Good Morning</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="bell" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Finance Overview Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Monthly Finance Overview ($)</Text>
            <Icon name="eye" size={20} color="#666" />
          </View>
          
          <View style={styles.balanceContainer}>
            <View>
              <Text style={styles.balanceAmount}>$7,783.00</Text>
              <Text style={styles.balanceLabel}>Total Balance</Text>
            </View>
            <View>
              <Text style={[styles.balanceAmount, styles.expenseAmount]}>-$1,187.40</Text>
              <Text style={styles.balanceLabel}>Total Expense</Text>
            </View>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '30%' }]} />
            </View>
            <Text style={styles.progressLabel}>30% Of Your Expenses, Looks Good.</Text>
          </View>
        </View>

        {/* Expenses Trend */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Monthly Expenses Trends</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          <LineChart
            data={currentChartData}
            width={Dimensions.get('window').width - 32}
            height={180}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: '#fff',
              backgroundGradientFrom: '#fff',
              backgroundGradientTo: '#fff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(156, 163, 175, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForLabels: {
                fontSize: 12,
              },
              propsForVerticalLabels: {
                fontSize: 12,
              },
            }}
            bezier
            style={styles.chart}
            withDots={false}
            withVerticalLines={false}
            withHorizontalLabels={true}
            fromZero={true}
            segments={4}
          />

          <View style={styles.periodToggle}>
            {['Daily', 'Weekly', 'Monthly'].map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.periodButton,
                  activePeriod === period.toLowerCase() && styles.periodButtonActive,
                ]}
                onPress={() => handlePeriodChange(period)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    activePeriod === period.toLowerCase() && styles.periodButtonTextActive,
                  ]}
                >
                  {period}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Salary List */}
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.salaryItem}>
              <View style={styles.salaryLeft}>
                <View style={styles.salaryIcon}>
                  <View style={styles.salaryIconInner} />
                </View>
                <Text style={styles.salaryText}>Salary</Text>
              </View>
              <Text style={styles.salaryAmount}>$4,000.00</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="home" size={24} color="#6366F1" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="credit-card" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="message-circle" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="bar-chart-2" size={24} color="#9CA3AF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="user" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  expenseAmount: {
    color: '#EF4444',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  seeAll: {
    fontSize: 14,
    color: '#6366F1',
  },
  chart: {
    marginVertical: 16,
  },
  periodToggle: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 16,
  },
  periodButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  periodButtonActive: {
    backgroundColor: '#6366F1',
  },
  periodButtonText: {
    color: '#6B7280',
    fontSize: 14,
  },
  periodButtonTextActive: {
    color: '#fff',
    fontSize: 14,
  },
  salaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  salaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  salaryIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  salaryIconInner: {
    width: 24,
    height: 24,
    backgroundColor: '#BFDBFE',
    borderRadius: 8,
  },
  salaryText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  salaryAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  navItem: {
    padding: 8,
  },
});

export default FinanceDashboard;
// DataVisualization.js
import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Platform, ViewProps } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
} from "react-native-chart-kit";

interface DataVisualizationProps extends ViewProps {
  // 其他属性...
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ style, ...props }) => {
  const screenWidth = Dimensions.get("window").width;

  // Sample data - replace with your actual data
  const monthlyData = {
    labels: ["Aug", "Sep", "Oct", "Nov"],
    datasets: [
      {
        data: [77, 80, 99, 43],
      }
    ]
  };

  const pieData = [
    {
      name: "Housing",
      population: 45,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Food",
      population: 28,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Shopping",
      population: 80,
      color: "#FFCE56",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const progressData = {
    labels: ["Food", "Shopping", "Housing"], // optional
    data: [0.4, 0.6, 0.8]
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  const chartWidth = Math.max(150, screenWidth - 60);

  const handleClick = () => {
    // Handle click event
  };

  // 在图表组件上添加条件渲染的属性
  const touchEvents = Platform.select({
    web: {},
    default: {
      onStartShouldSetResponder: () => true,
      onResponderGrant: () => {},
      onResponderMove: () => {},
      onResponderRelease: () => {},
      onResponderTerminate: () => {},
      onResponderTerminationRequest: () => true,
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartContainer}>
        <Text style={styles.title}>Monthly Performance</Text>
        <LineChart
          data={monthlyData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          // onClick={handleClick}
          // {...touchEvents}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Category Distribution</Text>
        <PieChart
          data={pieData}
          width={chartWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          style={styles.chart}
          // onClick={handleClick}
          // {...touchEvents}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Progress Overview</Text>
        <ProgressChart
          data={progressData}
          width={chartWidth}
          height={220}
          strokeWidth={16}
          radius={32}
          chartConfig={{
            ...chartConfig,
            color: (opacity = 1) => `rgba(81, 150, 244, ${opacity})`
          }}
          hideLegend={false}
          style={styles.chart}
          // onClick={handleClick}
          // {...touchEvents}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chartContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 0,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  }
});

export default DataVisualization;

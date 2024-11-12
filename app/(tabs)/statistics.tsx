import { StyleSheet, Platform, Button, FlatList } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import DataVisualization from '@/components/DataVisualization';
import { ScrollView } from 'react-native-gesture-handler';


export default function TabTwoScreen() {
  return (

    <ScrollView>
      < DataVisualization/>    
    </ScrollView>

    // <ParallaxScrollView
    //   headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>

    //   <ThemedView style={styles.stepContainer}>
    //     <DataVisualization></DataVisualization>
    //   </ThemedView>

    //   <ThemedView style={styles.stepContainer}>
    //     <Button title="获取交易数据" onPress={fetchTransactions} />
    //     <FlatList
    //       data={transactions}
    //       keyExtractor={(item) => item.id.toString()}
    //       renderItem={({ item }) => (
    //         <ThemedText>{JSON.stringify(item)}</ThemedText>
    //       )}
    //     />
    //   </ThemedView>
    // </ParallaxScrollView>
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
  },

});

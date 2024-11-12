import { Image, StyleSheet, Platform, Button, FlatList } from 'react-native';
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
    gap: 8,
  },
});

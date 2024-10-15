import React from 'react';
import { Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const menuItems = [
  { title: 'Account Management', icon: 'person-outline' },
  { title: 'Subscription Management', icon: 'card-outline' },
  { title: 'Data Management', icon: 'analytics-outline' },
  { title: 'Invite Friends', icon: 'people-outline' },
  { title: 'App Settings', icon: 'settings-outline' },
  { title: 'Notification Settings', icon: 'notifications-outline' },
  { title: 'Security & Privacy', icon: 'shield-outline' },
  { title: 'Customer Support & Help', icon: 'help-circle-outline' },
  { title: 'Log Out', icon: 'log-out-outline' },
];

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.headerContent}>
        <ThemedView style={styles.avatarContainer}>
          <Image
            source={require('@/assets/images/avatar-placeholder.png')}
            style={styles.avatar}
          />
          <ThemedView style={styles.cameraIconContainer}>
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.userInfo}>
          <ThemedText style={styles.name}>Powerpuff</ThemedText>
          <ThemedText style={styles.email}>Powerpuff@gmail.com</ThemedText>
          <ThemedText style={styles.plan}>monthly plan</ThemedText>
        </ThemedView>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="create-outline" size={20} color="#007AFF" />
        </TouchableOpacity>
      </ThemedView>
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index}>
          <ThemedView style={styles.menuItem}>
            <Ionicons name={item.icon as any} size={24} color="#888" />
            <ThemedText style={styles.menuText}>{item.title}</ThemedText>
            <Ionicons name="chevron-forward" size={24} color="#888" style={styles.chevron} />
          </ThemedView>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 15,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  cameraIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 2,
  },
  plan: {
    fontSize: 14,
    color: '#007AFF',
  },
  editButton: {
    padding: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    marginLeft: 'auto',
  },
});

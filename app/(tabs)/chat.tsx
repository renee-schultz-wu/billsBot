import React from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface ChatMessageProps {
  text: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser = false }) => (
  <View style={styles.messageWrapper}>
    {!isUser && (
      <View style={styles.iconContainer}>
        <Ionicons name="logo-react" size={24} color="#61DAFB" />
      </View>
    )}
    <ThemedView style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
      <ThemedText style={styles.messageText}>{text}</ThemedText>
    </ThemedView>
  </View>
);

export default function ChatScreen() {
  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
      >
        <ChatMessage text="👋 Welcome to Expensify AI Expense Assistant!" />
        <ChatMessage text="You can start a conversation with me by sending voice or text messages, uploading photos or files for the expense, and I will record the details. Let's make managing your finances easy together! 💰" />
        <ChatMessage text="Example for voice or text message:
🔹 I spent $15 on groceries yesterday.
🔹 Paid $50 for dinner at Luigi's Restaurant.
🔹 Bought movie tickets for $30 at Cinema City.
🔹 Spent $100 on new clothes at the mall.
🔹 Paid $20 for a taxi ride to work.
🔹 Bought concert tickets for $75 at Music Hall." />
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="image" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="mic" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  chatContainer: {
    flex: 1,
  },
  chatContentContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 4,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#A1CEDC',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: '#1D3D47',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

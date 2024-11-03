import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { chatWithAI } from '@/services/openai';

interface ChatMessageProps {
  text: string;
  isUser?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser = false }) => (
  <View style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.botMessageWrapper]}>
    {!isUser && (
      <View style={styles.iconContainer}>
        <Ionicons name="logo-react" size={24} color="#61DAFB" />
      </View>
    )}
    <ThemedView style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
      <ThemedText style={styles.messageText}>{text}</ThemedText>
    </ThemedView>
    {isUser && (
      <View style={styles.iconContainer}>
        <Ionicons name="person-circle" size={24} color="#1D3D47" />
      </View>
    )}
  </View>
);

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { text: "👋 Welcome to Your AI Personal Finance Assistant!", isUser: false },
    { text: "You can start a conversation with me by sending voice or text messages, uploading photos or files for the expense, and I will record the details. Let's make managing your finances easy together! 💰", isUser: false },
    { text: "🔹 I spent $15 on groceries yesterday.\n🔹 Paid $50 for dinner at Luigi's Restaurant.\n🔹 Bought movie tickets for $30 at Cinema City.\n🔹 Spent $100 on new clothes at the mall.\n🔹 Paid $20 for a taxi ride to work.\n🔹 Bought concert tickets for $75 at Music Hall.", isUser: false },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      const loadingMessage = { text: "Thinking...", isUser: false };
      setMessages(prev => [...prev, loadingMessage]);

      try {
        const aiResponse = await chatWithAI(inputText);
        
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: aiResponse, isUser: false }];
        });
      } catch (error) {
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: "抱歉，发生了错误，请稍后重试。", isUser: false }];
        });
      }

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={styles.chatContentContainer}
        showsVerticalScrollIndicator={true}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((message, index) => (
          <ChatMessage 
            key={index} 
            text={message.text} 
            isUser={message.isUser} 
          />
        ))}
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
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
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
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  messageContainer: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: '#A1CEDC',
    borderBottomRightRadius: 4,
  },
  botMessage: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
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

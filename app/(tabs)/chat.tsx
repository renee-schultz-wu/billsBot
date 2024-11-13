import React, { useState, useRef } from 'react';
import { StyleSheet, ScrollView, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { API_BASE_URL } from '@/config/constants';

interface ChatMessageProps {
  text: string;
  isUser?: boolean;
  image?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ text, isUser = false, image }) => (
  <View style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.botMessageWrapper]}>
    {!isUser && (
      <View style={styles.iconContainer}>
        <Image 
          source={require('@/assets/images/AIBot.png')}
          style={styles.avatarImage}
        />
      </View>
    )}
    <ThemedView style={[styles.messageContainer, isUser ? styles.userMessage : styles.botMessage]}>
      {image && (
        <Image 
          source={{ uri: image }} 
          style={styles.messageImage} 
          resizeMode="contain"
        />
      )}
      <ThemedText style={[
        styles.messageText,
        isUser && { color: '#fff' }
      ]}>{text}</ThemedText>
    </ThemedView>
    {isUser && (
      <View style={styles.iconContainer}>
        <Image 
          source={require('@/assets/images/avatar-placeholder.png')}
          style={styles.avatarImage}
        />
      </View>
    )}
  </View>
);

export default function ChatScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const welcomeText = [
    "👋 Welcome to Your AI Personal Finance Assistant!\n\n",
    "You can start a conversation with me by sending voice or text messages, uploading photos or files for the expense, and I will record the details. Let's make managing your finances easy together! 💰\n \n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " I spent $15 on groceries yesterday.\n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " Paid $50 for dinner at Luigi's Restaurant.\n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " Bought movie tickets for $30 at Cinema.\n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " Spent $100 on new clothes at the mall.\n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " Paid $20 for a taxi ride to work.\n",
    // <MaterialIcons name="fiber-manual-record" size={8} color="#61DAFB" />, " Bought concert tickets for $75 at Music Hall.",
  ].join('');

  const [messages, setMessages] = useState<ChatMessageProps[]>([
    { text: "👋 Welcome to Your AI Personal Finance Assistant!\n\nYou can start a conversation with me by sending voice or text messages, uploading photos or files for the expense, and I will record the details. Let's make managing your finances easy together! ", isUser: false },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = { text: inputText, isUser: true };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      const loadingMessage = { text: "Processing...", isUser: false };
      setMessages(prev => [...prev, loadingMessage]);

      try {
        const response = await fetch(`${API_BASE_URL}/transaction/addWithAI`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: inputText }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.text();
        
        const formattedText = formatTransactionResponse(data);
        
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: formattedText, isUser: false }];
        });
      } catch (error) {
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: "Sorry, an error occurred. Please try again later.", isUser: false }];
        });
      }

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const formatTransactionResponse = (response: string) => {
    try {
      const transaction = JSON.parse(response);
      let formattedText = ``;
      
      const fields = {
        amount: { icon: '💰', label: 'Amount', value: transaction.amount ? `$${transaction.amount}` : null },
        date: { icon: '📅', label: 'Date', value: transaction.date },
        time: { icon: '⏰', label: 'Time', value: transaction.time },
        transaction_type: { icon: '🔄', label: 'Type', value: transaction.transaction_type },
        category: { icon: '🏷️', label: 'Category', value: transaction.category },
        description: { icon: '📝', label: 'Description', value: transaction.description },
        payment_method: { icon: '💳', label: 'Payment Method', value: transaction.payment_method },
        currency: { icon: '💱', label: 'Currency', value: transaction.currency },
        location: { icon: '📍', label: 'Location', value: transaction.location },
        participants: { icon: '👥', label: 'Participants', value: transaction.participants }
      };

      Object.entries(fields).forEach(([key, { icon, label, value }]) => {
        if (value) {
          formattedText += `${icon} ${label}: ${value}\n`;
        }
      });

      return formattedText + '\nTransaction has been saved successfully! ✅';
    } catch (e) {
      return response;
    }
  };

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      alert("Permission to access gallery is required to upload images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const userImageMessage = { 
        text: '📸 Image Uploaded',
        isUser: true,
        image: result.assets[0].uri
      };
      setMessages(prev => [...prev, userImageMessage]);

      const loadingMessage = { text: "Processing image...", isUser: false };
      setMessages(prev => [...prev, loadingMessage]);

      try {
        const formData = new FormData();
        const localUri = result.assets[0].uri;
        const filename = localUri.split('/').pop();
        
        const response = await fetch(localUri);
        const blob = await response.blob();
        
        const maxSize = 15 * 1024 * 1024; // 15MB
        if (blob.size > maxSize) {
          alert("Image size cannot exceed 15MB");
          setMessages(prev => {
            const newMessages = prev.slice(0, -1);
            return [...newMessages, { text: "Image size exceeds limit. Please choose an image smaller than 15MB.", isUser: false }];
          });
          return;
        }

        const file = new File([blob], filename || 'image.jpg', { type: 'image/jpeg' });
        formData.append('image', file);

        const uploadResponse = await fetch(`${API_BASE_URL}/transaction/addWithAIImg`, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!uploadResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await uploadResponse.text();
        
        const formattedText = formatTransactionResponse(data);
        
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: formattedText, isUser: false }];
        });
      } catch (error) {
        console.error('Upload error:', error);
        setMessages(prev => {
          const newMessages = prev.slice(0, -1);
          return [...newMessages, { text: "Sorry, an error occurred while uploading the image. Please try again later.", isUser: false }];
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
            image={message.image} 
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="camera" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleImagePick}>
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
    backgroundColor: '#5063BF',
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
    backgroundColor: '#5063BF',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
});


import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Platform, 
  Image,
  Animated 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  text: string;
  isBot: boolean;
  date: Date;
}

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola Diego! En que te puedo ayudar hoy?",
      isBot: true,
      date: new Date()
    },
    {
      text: "Me siento estresado, que me recomiendas?",
      isBot: false,
      date: new Date()
    },
    {
      text: "Sal a caminar.",
      isBot: true,
      date: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  // Animated values for dots
  const dot1Opacity = useRef(new Animated.Value(0.6)).current;
  const dot2Opacity = useRef(new Animated.Value(0.6)).current;
  const dot3Opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }

    // Animation sequence for loading dots
    const animateDots = () => {
      Animated.sequence([
        Animated.timing(dot1Opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(dot2Opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(dot3Opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(dot1Opacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(dot2Opacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true
        }),
        Animated.timing(dot3Opacity, {
          toValue: 0.6,
          duration: 200,
          useNativeDriver: true
        })
      ]).start(() => {
        if (isLoading) {
          animateDots();
        }
      });
    };

    if (isLoading) {
      animateDots();
    }
  }, [messages, isLoading, dot1Opacity, dot2Opacity, dot3Opacity]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newUserMessage: Message = {
      text: inputText,
      isBot: false,
      date: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        text: "Gracias por tu mensaje. Por ahora soy un bot simple, ¡pero pronto seré más inteligente!",
        isBot: true,
        date: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageBubble,
      item.isBot ? styles.botMessage : styles.userMessage
    ]}>
      {isLoading && item === messages[messages.length - 1] && item.isBot ? (
        <View style={styles.loadingDots}>
          <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
          <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
        </View>
      ) : (
        <Text style={styles.messageText}>{item.text}</Text>
      )}
    </View>
  );

  const LoadingIndicator = () => (
    <View style={[styles.messageBubble, styles.botMessage]}>
      <View style={styles.loadingDots}>
        <Animated.View style={[styles.dot, { opacity: dot1Opacity }]} />
        <Animated.View style={[styles.dot, { opacity: dot2Opacity }]} />
        <Animated.View style={[styles.dot, { opacity: dot3Opacity }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../../public/lovable-uploads/70da5878-9104-43f4-a80c-d917eeb7f844.png')} 
            style={styles.avatar}
          />
        </View>
        <Text style={styles.headerTitle}>PIIA</Text>
      </View>

      {/* Messages List */}
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(_, index) => `msg-${index}`}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContainer}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input Area */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#9e9e9e"
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton,
            (!inputText.trim() || isLoading) ? styles.disabledButton : {}
          ]}
          onPress={handleSendMessage}
          disabled={!inputText.trim() || isLoading}
        >
          <Ionicons name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Loading indicator at the bottom of messages */}
      {isLoading && <LoadingIndicator />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(60, 60, 70, 0.5)',
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  messagesList: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  botMessage: {
    backgroundColor: 'rgba(60, 60, 70, 0.6)',
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(80, 80, 90, 0.3)',
  },
  userMessage: {
    backgroundColor: '#FF4081',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(60, 60, 70, 0.5)',
    backgroundColor: 'rgba(40, 40, 50, 0.8)',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(60, 60, 70, 0.6)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    color: '#fff',
    marginRight: 8,
    maxHeight: 120,
  },
  sendButton: {
    backgroundColor: '#FF4081',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  loadingDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#9e9e9e',
    marginHorizontal: 2,
  },
});

export default ChatbotScreen;

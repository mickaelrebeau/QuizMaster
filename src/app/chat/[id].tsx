import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect,useState } from 'react';
import { GiftedChat, type IMessage } from 'react-native-gifted-chat';

export function Chat() {
  const local = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <Stack.Screen
        options={{ title: `Chat ${local.id}`, headerBackTitle: 'Chat' }}
      />
      <GiftedChat
        messages={messages}
        // @ts-ignore
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
}
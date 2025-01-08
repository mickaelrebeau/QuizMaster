import { Link } from 'expo-router';
import * as React from 'react';

import { Title } from '@/components/title';
import { Pressable, Text, View } from '@/components/ui';
import { FocusAwareStatusBar, SafeAreaView, ScrollView } from '@/components/ui';

export default function Chats() {
  const chats = [
    {
      id: 1,
      title: 'Discussion générale',
      lastMessage: 'Bonjour à tous ! Comment allez-vous ?',
      lastMessageTime: '10:30'
    },
    {
      id: 2, 
      title: 'Support technique',
      lastMessage: 'J\'ai résolu le problème avec la dernière mise à jour',
      lastMessageTime: '09:15'
    },
    {
      id: 3,
      title: 'Idées et suggestions',
      lastMessage: 'On pourrait ajouter une nouvelle fonctionnalité...',
      lastMessageTime: 'Hier'
    },
    {
      id: 4,
      title: 'Questions fréquentes',
      lastMessage: 'Consultez notre FAQ pour plus d\'informations',
      lastMessageTime: 'Hier'
    }
  ];
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <Title text="Messages" />
          <View className="mb-4 flex-col">
            {chats.map((chat) => (
              <Link key={chat.id} href={`/chat/${chat.id}`} asChild>
                <Pressable
                  key={chat.id}
                  className="mb-4 rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800"
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-1">
                      <Text className="text-lg font-medium">{chat.title}</Text>
                      <Text
                        className="text-sm text-neutral-500 dark:text-neutral-400"
                        numberOfLines={1}
                      >
                        {chat.lastMessage}
                      </Text>
                    </View>
                    <Text className="text-xs text-neutral-500 dark:text-neutral-400">
                      {chat.lastMessageTime}
                    </Text>
                  </View>
                </Pressable>
              </Link>
            ))}
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

import { useRouter } from 'expo-router';
import React from 'react';

import {
  Button,
  FocusAwareStatusBar,
  Text,
  View } from '@/components/ui';
import Quiz from '@/components/ui/icons/quiz';

export default function Home() {
  const router = useRouter();

  return (
    <View className="flex h-full items-center justify-between py-8">
      <FocusAwareStatusBar />
      <View className="mt-12 w-full px-6">
        <Text className="text-center text-5xl font-bold text-violet-600">
          QuizMaster AI
        </Text>
        <Text className="mt-4 text-center text-lg text-gray-500">
          Expand your knowledge, one question at a time.
        </Text>
      </View>

      <Quiz />

      <View className="w-full px-6">
        <Button
          label="Start a New Quiz 🎮"
          onPress={() => router.push('/quiz/new-quiz')}
          className="mb-4"
        />
        <Button
          label="View Quiz History 📊"
          onPress={() => router.push('/history')}
          className="mb-4"
        />
        <Button
          label="How to Play? 📖"
          onPress={() => router.push('/instructions')}
        />
      </View>
    </View>
  );
}

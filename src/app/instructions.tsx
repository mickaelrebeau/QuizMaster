import { Stack } from 'expo-router';
import React from 'react';

import {
  FocusAwareStatusBar,
  ScrollView,
  Text,
  View,
} from '@/components/ui';

export default function Instructions() {
  return (
    <View className="flex h-full">
      <Stack.Screen
        options={{ title: 'Instructions', headerBackTitle: 'Home' }}
      />
      <FocusAwareStatusBar />

      <View className="w-full px-6 py-8">
        <Text className="text-center text-4xl font-bold text-violet-600">
          How to Play ?
        </Text>
      </View>

      <ScrollView className="flex-1 px-6">
        <Text className="mb-4 text-lg text-gray-800">
          Welcome to <Text className="font-bold">QuizMaster AI</Text>! Here’s
          how to get started:
        </Text>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold text-gray-900">
            1. Choose a Topic
          </Text>
          <Text className="text-gray-700">
            Start by entering a topic you’re interested in. It could be history,
            technology, cinema, or anything else!
          </Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold text-gray-900">
            2. Answer Questions
          </Text>
          <Text className="text-gray-700">
            You’ll get a series of questions generated by AI. Each question is
            designed to challenge your knowledge.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold text-gray-900">
            3. Track Your Progress
          </Text>
          <Text className="text-gray-700">
            At the end of each quiz, see your score and learn from explanations
            provided for each question.
          </Text>
        </View>

        <View className="mb-6">
          <Text className="mb-2 text-xl font-semibold text-gray-900">
            4. Challenge Yourself
          </Text>
          <Text className="text-gray-700">
            Try quizzes on different topics to broaden your knowledge and
            improve your skills!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
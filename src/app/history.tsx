/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';

import { FocusAwareStatusBar, Text, View } from '@/components/ui';

type HistoryItem = {
  id: string;
  topic: string;
  score: number;
  total: number;
  date: string;
  questions: { question: string; response: string; correct: boolean }[];
};

export default function History() {
  const [history, _setHistory] = useState([
    {
      id: '1',
      topic: 'History',
      score: 8,
      total: 10,
      date: '2025-01-07',
      questions: [
        {
          question: 'Who was the first president of the United States?',
          response: 'George Washington',
          correct: true,
        },
        {
          question: 'When was the Declaration of Independence signed?',
          response: '1776',
          correct: true,
        },
        {
          question: 'Which war ended in 1945?',
          response: 'World War II',
          correct: false,
        },
      ],
    },
    {
      id: '2',
      topic: 'Technology',
      score: 7,
      total: 10,
      date: '2025-01-06',
      questions: [
        {
          question: 'Who is the founder of Microsoft?',
          response: 'Bill Gates',
          correct: true,
        },
        {
          question: 'What does HTTP stand for?',
          response: 'HyperText Transfer Protocol',
          correct: true,
        },
        {
          question: 'What year was the first iPhone released?',
          response: '2007',
          correct: false,
        },
      ],
    },
    {
      id: '3',
      topic: 'Cinema',
      score: 6,
      total: 10,
      date: '2025-01-05',
      questions: [
        {
          question: 'Who directed "Inception"?',
          response: 'Christopher Nolan',
          correct: true,
        },
        {
          question: 'Which actor played Iron Man?',
          response: 'Robert Downey Jr.',
          correct: true,
        },
        {
          question: 'What year was "Titanic" released?',
          response: '1997',
          correct: false,
        },
      ],
    },
  ]);

  const [selectedQuiz, setSelectedQuiz] = useState<HistoryItem | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = (quiz: HistoryItem): void => {
    setSelectedQuiz(quiz as any);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuiz(null);
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View className="mb-4 rounded-lg p-4 shadow-md dark:bg-neutral-900">
      <Text className="text-lg font-bold text-violet-600">{item.topic}</Text>
      <Text className="text-gray-700">
        Score: {item.score}/{item.total}
      </Text>
      <Text className="text-base text-gray-400">Date: {item.date}</Text>
      <Pressable onPress={() => openModal(item)}>
        <Text className="text-right text-lg text-gray-500">
          View questions {'->'}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View className="flex h-full">
      <Stack.Screen options={{ title: 'History', headerBackTitle: 'Home' }} />
      <FocusAwareStatusBar />

      <View className="w-full px-6 py-8">
        <Text className="text-center text-4xl font-extrabold text-violet-600">
          Quiz History
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item: { id: string }) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-gray-500">
            No quiz history found. Start a quiz to see your progress!
          </Text>
        }
      />

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center bg-white px-6 dark:bg-neutral-950">
          <View className="rounded-lgp-6">
            <View className="mb-8 flex-row items-center justify-between">
              <Text className="text-xl font-bold text-violet-600">
                {selectedQuiz && selectedQuiz.topic} Questions
              </Text>
              <Pressable onPress={closeModal}>
                <Ionicons name="close" size={24} color="gray" />
              </Pressable>
            </View>

            <FlatList
              data={selectedQuiz?.questions}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View className="mb-4">
                  <Text className="text-gray-700">
                    {index + 1}. {item.question}
                  </Text>
                  <Text className="mt-1 text-gray-500">
                    Your Answer: {item.response}
                  </Text>
                  <Text
                    className={`mt-2 text-right ${
                      item.correct ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {item.correct ? 'Correct' : 'Incorrect'}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
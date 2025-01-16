/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable } from 'react-native';

import { getUserQuizzes } from '@/api/quiz';
import { colors, FocusAwareStatusBar, Text, View } from '@/components/ui';
import { ArrowRight } from '@/components/ui/icons';
import { type userQuizType } from '@/types';


export default function History() {
  const [history, setHistory] = useState<userQuizType[] | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<userQuizType | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];

  React.useEffect(() => {
    const getHistory = async () => {
      try {
        const history = await getUserQuizzes();
        if (history) {
          setHistory(history);
        }
      } catch (error) {
        console.error('Error getting quiz history:', error);
      }
    };

    getHistory();
  }, []);

  const openModal = (quiz: userQuizType): void => {
    setSelectedQuiz(quiz as any);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuiz(null);
  };

  const renderItem = ({ item }: { item: userQuizType }) => (
    <View className="mb-4 rounded-lg p-4 shadow-md dark:bg-neutral-900">
      <Text className="text-lg font-bold text-violet-600">{item.topic}</Text>
      <Text className="text-gray-700">
        Score: {item.score}/{item.userAnswers.length}
      </Text>
      <Pressable onPress={() => openModal(item)}>
        <Text className="flex items-center justify-end gap-3 text-lg text-gray-500">
          View questions <ArrowRight color={iconColor} />
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View className="flex h-full">
      <Stack.Screen options={{ title: 'History', headerBackTitle: 'Home' }} />
      <FocusAwareStatusBar />

      <View className="w-full px-6 py-8">
        <Text className="text-center text-4xl font-bold text-violet-600">
          Quiz History
        </Text>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item: userQuizType) => item.topic || ''}
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
        <View className="h-full flex-1 justify-center bg-white px-6 py-8 dark:bg-neutral-900">
          <View className="mb-8 flex-row items-center justify-between">
            <Text className="text-xl font-bold text-violet-600">
              {selectedQuiz && selectedQuiz.topic} Questions
            </Text>
            <Pressable onPress={closeModal}>
              <Ionicons name="close" size={24} color="gray" />
            </Pressable>
          </View>
          <View className="mb-4">
            <Text className="text-gray-700">
              Score: {selectedQuiz?.score}/{selectedQuiz?.userAnswers.length}
            </Text>
          </View>

          <FlatList
            data={selectedQuiz?.userAnswers}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={{
              paddingHorizontal: 8,
              paddingBottom: 16,
            }}
            renderItem={({ item, index }) => (
              <View className="mb-4 rounded border border-slate-300 p-4 shadow">
                <Text className="font-semibold text-gray-700">
                  {index + 1}. {item.question}
                </Text>
                <Text className="mt-1 text-gray-500">
                  Correct Answer: {item.correctAnswer}
                </Text>
                <Text className="mt-1 text-gray-500">
                  Your Answer: {item.userAnswer}
                </Text>
                <Text
                  className={`mt-2 text-right ${
                    item.userAnswer === item.correctAnswer
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.userAnswer === item.correctAnswer
                    ? 'Correct'
                    : 'Incorrect'}
                </Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
}
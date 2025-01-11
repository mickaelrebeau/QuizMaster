/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';

import { Button, Radio, Text, View } from '@/components/ui';

type QuestionItem = {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export default function QuizPage() {
  const { topic, questions, difficulty } = useLocalSearchParams();
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string;
  }>({});

  const shuffleArray = (array: string[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const data = React.useMemo(
    () =>
      [
        {
          id: '1',
          question: 'Who was the first president of the United States?',
          correctAnswer: 'George Washington',
          incorrectAnswers: ['John Adams', 'Thomas Jefferson', 'James Madison'],
        },
        {
          id: '2',
          question: 'When was the Declaration of Independence signed?',
          correctAnswer: '1776',
          incorrectAnswers: ['1787', '1799', '1801'],
        },
        {
          id: '3',
          question: 'Which war ended in 1945?',
          correctAnswer: 'World War II',
          incorrectAnswers: ['World War I', 'Vietnam War', 'Korean War'],
        },
        {
          id: '4',
          question: 'Who is the founder of Microsoft?',
          correctAnswer: 'Bill Gates',
          incorrectAnswers: ['Steve Jobs', 'Jeff Bezos', 'Elon Musk'],
        },
        {
          id: '5',
          question: 'What does HTTP stand for?',
          correctAnswer: 'HyperText Transfer Protocol',
          incorrectAnswers: [
            'HyperText Transfer Package',
            'HyperText Transfer Program',
            'HyperText Transfer Process',
          ],
        },
        {
          id: '6',
          question: 'What is the capital of France?',
          correctAnswer: 'Paris',
          incorrectAnswers: ['London', 'Berlin', 'Madrid'],
        },
      ].map((question) => ({
        ...question,
        shuffledAnswers: shuffleArray([
          question.correctAnswer,
          ...question.incorrectAnswers,
        ]),
      })),
    [],
  );

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const renderItem = ({
    item,
  }: {
    item: QuestionItem & { shuffledAnswers: string[] };
  }) => (
    <View className="mt-4 rounded-lg bg-white px-2 py-4 shadow-md dark:bg-neutral-900">
      <Text className="text-lg font-bold">{item.question}</Text>
      <View className="mt-4">
        {item.shuffledAnswers.map((answer) => (
          <Radio.Root
            key={answer}
            checked={selectedAnswers[item.id] === answer}
            onChange={() => handleAnswerSelect(item.id, answer)}
            accessibilityLabel={answer}
            className="text-lg"
          >
            <Radio.Icon checked={selectedAnswers[item.id] === answer} />
            <Radio.Label text={answer} />
          </Radio.Root>
        ))}
      </View>
    </View>
  );

  const handleSubmit = () => {
    console.log('Selected Answers:', selectedAnswers);
    alert('Answers submitted!');
  };

  return (
    <View className="flex-1 px-6 py-8">
      <Stack.Screen options={{ title: `Quiz ${topic}` }} />
      <Text className="text-center text-3xl font-bold text-violet-600">
        Quiz Topic: {topic}
      </Text>
      <Text className="mt-4 text-lg text-gray-500">
        Difficulty: {difficulty || 'Not specified'}
      </Text>
      <Text className="my-4 text-lg text-gray-500">
        Number of Questions: {questions || 'Not specified'}
      </Text>
      <FlatList
        data={data}
        keyExtractor={(item: { id: string }) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <Text className="mt-8 text-center text-gray-500">
            No quiz history found. Start a quiz to see your progress!
          </Text>
        }
      />
      <Button label="Submit Answers" onPress={handleSubmit} className="mt-4" />
    </View>
  );
}
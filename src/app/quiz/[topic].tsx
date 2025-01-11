/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Modal } from 'react-native';

import { Button, Radio, Text, View } from '@/components/ui';

type QuestionItem = {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
};

export default function QuizPage() {
  const router = useRouter();
  const { topic, questions, difficulty } = useLocalSearchParams();
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string;
  }>({});
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState<number | null>(null);

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

  const calculateScore = () => {
    const correctAnswers = data.reduce((count, question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);
    setScore(correctAnswers);
  };

  const handleSubmit = () => {
    calculateScore();
    setShowResults(true);
  };

  const closeModal = () => {
    setShowResults(false);
    router.push('/');
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

      <Modal
        visible={showResults}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View className="flex-1 items-center justify-center bg-white dark:bg-neutral-900">
          <View className="w-100 p-6">
            <Text className="text-center text-2xl font-bold text-violet-600">
              Quiz Results
            </Text>
            <Text className="mt-4 text-lg">
              Score: {score} / {data.length}
            </Text>
            {data.map((question) => (
              <View key={question.id} className="mt-4">
                <Text className="font-bold">{question.question}</Text>
                <Text>
                  Your Answer:{' '}
                  <Text
                    className={
                      selectedAnswers[question.id] === question.correctAnswer
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {selectedAnswers[question.id] || 'No answer selected'}
                  </Text>
                </Text>
                <Text>
                  Correct Answer:{' '}
                  <Text className="text-green-600">
                    {question.correctAnswer}
                  </Text>
                </Text>
              </View>
            ))}
            <Button label="Close" onPress={closeModal} className="mt-4" />
          </View>
        </View>
      </Modal>
    </View>
  );
}
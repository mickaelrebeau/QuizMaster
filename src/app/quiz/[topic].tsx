/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Modal } from 'react-native';

import { saveUserQuiz } from '@/api/quiz';
import { Button, Radio, Text, View } from '@/components/ui';
import { type QuestionItem, type QuizDatatype,type UserAnswerType,type userQuizType } from '@/types';


export default function QuizPage() {
  const router = useRouter();
  const { topic, data } = useLocalSearchParams();
  const [selectedAnswers, setSelectedAnswers] = React.useState<{
    [key: string]: string;
  }>({});
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState<number | null>(null);
  const [quizData, setQuizData] = React.useState<QuizDatatype | null>(null);
  const [questions, setQuestions] = React.useState<QuestionItem[] | null>(null);
  const [userAnswers, setUserAnswers] = React.useState<UserAnswerType[]>([]);

  const shuffleArray = (array: string[]) => {
    return array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  React.useEffect(() => {
    try {
      const parsedData = JSON.parse(data as string) as QuizDatatype;
      setQuizData(parsedData);

      if (parsedData?.questions) {
        setQuestions(
          parsedData.questions.map((question) => ({
            ...question,
            shuffledAnswers: shuffleArray([
              ...question.incorrectAnswers,
              question.correctAnswer,
            ]),
          })),
        );
      }
    } catch (error) {
      console.error('Error parsing quiz data:', error);
    }
  }, [data]);

  const handleAnswerSelect = (question: string, answer: string) => {
    console.log('Question:', question);
    console.log('Selected answer:', answer);
    setSelectedAnswers((prev) => ({
      ...prev,
      [question]: answer,
    }));
  };

  const renderItem = ({
    item,
  }: {
    item: QuestionItem;
  }) => (
    <View className="mt-4 rounded-lg bg-white px-2 py-4 shadow-md dark:bg-neutral-900">
      <Text className="text-lg font-bold">{item.question}</Text>
      <View className="mt-4">
        {item.shuffledAnswers?.map((answer) => (
          <Radio.Root
            key={answer}
            checked={selectedAnswers[item.question] === answer}
            onChange={() => handleAnswerSelect(item.question, answer)}
            accessibilityLabel={answer}
            className="text-lg"
          >
            <Radio.Icon checked={selectedAnswers[item.question] === answer} />
            <Radio.Label text={answer} />
          </Radio.Root>
        ))}
      </View>
    </View>
  );

  const renderAnswerItem = ({ item }: { item: QuestionItem }) => (
    <View className="mt-4">
      <Text className="font-bold">{item.question}</Text>
      <Text>
        Your Answer:{' '}
        <Text
          className={
            selectedAnswers[item.question] === item.correctAnswer
              ? 'text-green-600'
              : 'text-red-600'
          }
        >
          {selectedAnswers[item.question] || 'No answer selected'}
        </Text>
      </Text>
      <Text>
        Correct Answer:{' '}
        <Text className="text-green-600">{item.correctAnswer}</Text>
      </Text>
      <Text className="mt-2">{item.explanation}</Text>
    </View>
  );

  const calculateScore = () => {
    const correctAnswers = quizData?.questions.reduce(
      (count: number, question: QuestionItem) => {
        if (selectedAnswers[question.question] === question.correctAnswer) {
          return count + 1;
        }
        return count;
      },
      0,
    );
    setScore(correctAnswers ?? 0);

    setUserAnswers(
      quizData?.questions.map((question) => ({
        question: question.question,
        correctAnswer: question.correctAnswer,
        userAnswer: selectedAnswers[question.question] || '',
      })) || [],
    );
  };

  const handleSubmit = async () => {
    calculateScore();
    setShowResults(true);
    try {
      const userQuizData: userQuizType = {
        topic: quizData?.topic,
        score: score,
        userAnswers,
      };
      
      await saveUserQuiz(userQuizData);
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  const closeModal = () => {
    setShowResults(false);
    router.push('/');
  };

  return (
    <View className="flex-1 px-6 py-8">
      <Stack.Screen options={{ title: `Quiz ${topic}` }} />
      <Text className="text-center text-3xl font-bold text-violet-600">
        Quiz Topic: {quizData?.topic}
      </Text>
      <Text className="mt-4 text-lg text-gray-500">
        Difficulty: {quizData?.difficulty || 'Not specified'}
      </Text>
      <Text className="my-4 text-lg text-gray-500">
        Number of Questions: {quizData?.numberOfQuestions || 'Not specified'}
      </Text>
      <FlatList
        data={questions}
        keyExtractor={(item: { question: string }) => item.question}
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
        <View className="w-100 flex-1 justify-center bg-white p-6 dark:bg-neutral-900">
          <Text className="text-center text-2xl font-bold text-violet-600">
            Quiz Results
          </Text>
          <Text className="mt-4 text-lg">
            Score: {score} / {questions?.length || 0}
          </Text>
          <FlatList
            data={questions}
            keyExtractor={(item: { question: string }) => item.question}
            renderItem={renderAnswerItem}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingBottom: 16,
            }}
            ListEmptyComponent={
              <Text className="mt-8 text-center text-gray-500">
                No quiz answers found. Start a quiz to see your results!
              </Text>
            }
          />
          <Button label="Close" onPress={closeModal} className="mt-4" />
        </View>
      </Modal>
    </View>
  );
}

/* eslint-disable max-lines-per-function */
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import { run, saveGeneratedQuiz } from '@/api/quiz';
import { Item } from '@/components/new-quiz/item';
import {
  Button,
  FocusAwareStatusBar,
  Input,
  Options,
  type OptionType,
  ScrollView,
  Text,
  useModal,
  View,
} from '@/components/ui';
import { getLanguage } from '@/lib';
import { type QuizDatatype } from '@/types';

export default function NewQuiz() {
  const router = useRouter();
  const modal = useModal();
  const modal2 = useModal();
  const modal3 = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<{
    label: string;
    value: string | number;
  } | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [questionsNumber, setQuestionsNumber] = useState<{
    label: string;
    value: string | number;
  }>({ label: '10', value: 10 });
  const [difficulty, setDifficulty] = useState<{
    label: string;
    value: string | number;
  }>({ label: 'Easy', value: 'easy' });
  const language = getLanguage();

  const topics = React.useMemo(
    () => [
      { label: 'Other', value: '' },
      { label: 'Music', value: 'music' },
      { label: 'Art', value: 'art' },
      { label: 'Science', value: 'science' },
      { label: 'History', value: 'history' },
      { label: 'Technology', value: 'technology' },
      { label: 'Mathematics', value: 'mathematics' },
      { label: 'Sports', value: 'sports' },
      { label: 'Entertainment', value: 'entertainment' },
      { label: 'Geography', value: 'geography' },
      { label: 'Politics', value: 'politics' },
      { label: 'General Knowledge', value: 'general' },
    ],
    [],
  );

  const numberOfQuestions = React.useMemo(
    () => [
      { label: '10', value: 10 },
      { label: '20', value: 20 },
      { label: '50', value: 50 },
      { label: '100', value: 100 },
    ],
    [],
  );

  const difficulties = React.useMemo(
    () => [
      { label: 'Easy', value: 'easy' },
      { label: 'Medium', value: 'medium' },
      { label: 'Hard', value: 'hard' },
    ],
    [],
  );

  const onSelect = React.useCallback(
    (option: OptionType) => {
      setSelectedTopic(option);
      setCustomTopic('');
      modal.dismiss();
    },
    [modal],
  );

  const onSelectNumber = React.useCallback(
    (option: OptionType) => {
      setQuestionsNumber(option);
      modal2.dismiss();
    },
    [modal2],
  );

  const onSelectDifficulty = React.useCallback(
    (option: OptionType) => {
      setDifficulty(option);
      modal3.dismiss();
    },
    [modal3],
  );

  const handleStartQuiz = async () => {
    setIsLoading(true);
    const topic = customTopic || selectedTopic?.label;
    if (!topic) {
      showMessage({
        message: 'Please select or enter a topic to start the quiz!',
        type: 'danger',
      });
      setIsLoading(true);
      return;
    }

    const data = {
      topic: topic,
      difficulty: difficulty.value,
      language: language,
      numberOfQuestions: questionsNumber.value,
    };

    try {
      const response = await run(data);
      console.log('Type of Response', typeof response);

      const jsonResponse = JSON.stringify(response);
      const parseResponse = JSON.parse(
        jsonResponse.replace('```json', '').replace('```', ''),
      );

      const parsedData = JSON.parse(parseResponse as string) as QuizDatatype;
      saveGeneratedQuiz(parsedData);

      setIsLoading(false);
      router.push({
        pathname: `/quiz/[topic]`,
        params: {
          topic:
            topic.toLowerCase().replace(/\s/g, '-') ||
            customTopic.toLowerCase().replace(/\s/g, '-'),
          data: parseResponse,
        },
      });
    } catch (error) {
      console.error(error);
      showMessage({
        message: 'Something went wrong while fetching the quiz!',
        type: 'danger',
      });
      setIsLoading(true);
    }
  };

  return (
    <View className="flex-1 px-6 py-8">
      <Stack.Screen options={{ title: 'New Quiz', headerBackTitle: 'Home' }} />
      <FocusAwareStatusBar />
      <ScrollView>
        <Text className="text-center text-3xl font-bold text-violet-600">
          Start a New Quiz
        </Text>
        <Text className="mt-4 text-center text-lg text-gray-500">
          Choose a topic below or write your own!
        </Text>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-700">
            Predefined Topics:
          </Text>
          <View className="mt-4 rounded border border-slate-300">
            <Item
              text="Select a Topic"
              value={selectedTopic?.label}
              onPress={modal.present}
            />
            <Options
              ref={modal.ref}
              options={topics}
              onSelect={onSelect}
              value={selectedTopic?.label || ''}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-700">
            Or Enter Your Own Topic:
          </Text>
          <Input
            value={customTopic}
            onChangeText={(text) => {
              setCustomTopic(text);
              setSelectedTopic(null);
            }}
            placeholder="Enter custom topic"
            className="mt-2 rounded-lg border border-gray-300 p-4 text-lg"
          />
        </View>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-700">
            Number of Questions:
          </Text>
          <View className="mt-4 rounded border border-slate-300">
            <Item
              text="Select a Number"
              value={questionsNumber?.label}
              onPress={modal2.present}
            />
            <Options
              ref={modal2.ref}
              options={numberOfQuestions}
              onSelect={onSelectNumber}
              value={questionsNumber?.label || ''}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-700">
            Level of Difficulty:
          </Text>
          <View className="mt-4 rounded border border-slate-300">
            <Item
              text="Select a Difficulty"
              value={difficulty?.label}
              onPress={modal3.present}
            />
            <Options
              ref={modal3.ref}
              options={difficulties}
              onSelect={onSelectDifficulty}
              value={difficulty?.label || ''}
            />
          </View>
        </View>
      </ScrollView>
      <Button
        label="Start Quiz 🎮"
        onPress={handleStartQuiz}
        className="mt-6 w-full"
        loading={isLoading}
      />
    </View>
  );
}

import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';

import {
  Button,
  FocusAwareStatusBar,
  Text,
  View,
} from '@/components/ui';

export default function Home() {
  const router = useRouter();
  const animation = React.useRef<LottieView>(null);

  return (
    <View className="flex h-full items-center justify-between py-8">
      <FocusAwareStatusBar />
      <View className="mt-12 w-full px-6">
        <Text className="text-center text-5xl font-extrabold text-violet-600">
          QuizMaster AI
        </Text>
        <Text className="mt-4 text-center text-lg text-gray-500">
          Expand your knowledge, one question at a time.
        </Text>
      </View>

      <LottieView
        autoPlay
        loop
        ref={animation}
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#eee',
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('assets/quizz.json')}
      />

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

import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';

import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import { translate } from '@/lib';
import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();
  const animation = React.useRef<LottieView>(null);

  return (
    <View className="flex h-full items-center justify-center py-8">
      <FocusAwareStatusBar />
      <View className="px-4">
        <Text className="mb-3 text-center text-4xl font-extrabold text-violet-600">
          {translate('onboarding.title')}
        </Text>
        <Text className="mb-5 text-center text-lg text-gray-600">
          {translate('onboarding.message')}
        </Text>
      </View>
      <View className="w-full flex-1">
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
      </View>
      <View className="px-4">
        <Text className="my-1 text-left text-lg">
          🌟 {translate('onboarding.features.one')}
        </Text>
        <Text className="my-1 text-left text-lg">
          🧠 {translate('onboarding.features.two')}
        </Text>
        <Text className="my-1 text-left text-lg">
          🚀 {translate('onboarding.features.three')}
        </Text>
        <Text className="my-1 text-left text-lg">
          📊 {translate('onboarding.features.four')}
        </Text>
      </View>
      <SafeAreaView className="mt-6">
        <Button
          label={translate('onboarding.join')}
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
      <SafeAreaView className="mt-8 w-full">
        <Text className="text-center text-sm text-gray-400">
          Powered by AI | © 2025 QuizMaster
        </Text>
      </SafeAreaView>
    </View>
  );
}

/* eslint-disable max-lines-per-function */
import { useRouter } from 'expo-router';
import React from 'react';

import {
  Button,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/components/ui';
import QuizIllustration from '@/components/ui/icons/quiz2';
import { translate } from '@/lib';
import { useIsFirstTime } from '@/lib/hooks';

export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();
  const router = useRouter();

  return (
    <View className="flex h-full items-center justify-center py-8">
      <FocusAwareStatusBar />
      <View className="px-4">
        <Text className="mb-3 text-center text-4xl font-bold text-violet-600">
          {translate('onboarding.title')}
        </Text>
        <Text className="mb-5 text-center text-lg text-gray-600">
          {translate('onboarding.message')}
        </Text>
      </View>

      <QuizIllustration />

      <View className="mt-4 px-4">
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
            router.replace('/signup');
          }}
        />
        <View className="my-6 w-full border-b border-slate-300" />
        <Text>{translate('onboarding.already')} </Text>
        <Button
          label={translate('onboarding.login')}
          onPress={() => {
            setIsFirstTime(false);
            router.replace('/login');
          }}
        />
      </SafeAreaView>
      <SafeAreaView className="mt-8 w-full">
        <Text className="text-center text-sm text-gray-400">
          {translate('onboarding.powered')}
        </Text>
      </SafeAreaView>
    </View>
  );
}

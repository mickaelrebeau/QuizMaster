import { Stack } from 'expo-router';
import * as React from 'react';

import { Text,View } from '@/components/ui';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View className="flex size-full items-center justify-center">
        <Text className="text-center">
          This screen doesn't exist. Please check the URL and try again.
        </Text>
      </View>
    </>
  );
}

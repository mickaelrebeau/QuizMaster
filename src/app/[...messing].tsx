import { Stack } from 'expo-router';
import LottieView from 'lottie-react-native';
import * as React from 'react';

import { View } from '@/components/ui';

export default function NotFoundScreen() {
  const animation = React.useRef<LottieView>(null);
  
  return (
    <>
      <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
      <View className="flex size-full items-center justify-center">
        <LottieView
          autoPlay
          loop
          ref={animation}
          style={{
            width: 300,
            height: 300,
            backgroundColor: '#eee',
          }}
          // Find more Lottie files at https://lottiefiles.com/featured
          source={require('assets/404.json')}
        />
      </View>
    </>
  );
}

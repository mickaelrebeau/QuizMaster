import * as React from 'react';

import { Text, View } from '@/components/ui';
import { FocusAwareStatusBar, SafeAreaView, ScrollView } from '@/components/ui';

export default function Home() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <SafeAreaView className="flex-1">
          <Text className="text-2xl font-bold">Home page</Text>
          <View className="pt-8">
            
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
}

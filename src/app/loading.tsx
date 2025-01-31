import { ActivityIndicator, Text, View } from '@/components/ui';

export default function LoadingScreen() {
  return (
    <View className="flex-1 items-center justify-center gap-8 bg-slate-100 dark:bg-slate-600">
      <Text className="my-4 text-4xl font-bold text-violet-600">
        QuizMaster
      </Text>

      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}

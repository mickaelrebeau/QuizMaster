import { type QuizDatatype, type userQuizType } from '@/types';
import { getUserId, supabase } from '@/utils/supabase';

export const saveGeneratedQuiz = async (quiz: QuizDatatype) => {
  const { data, error } = await supabase.from('quizzes').insert([quiz]);

  if (error) {
    console.error('Error saving quiz:', error);
  } else {
    console.log('Quiz saved successfully:', data);
  }
};

export const saveUserQuiz = async (quiz: userQuizType) => {
  const userId = await getUserId();
  const quizWithUserId = { ...quiz, user_id: userId };

  const { data, error } = await supabase
    .from('users-quizzes')
    .insert([quizWithUserId]);

  if (error) {
    console.error('Error saving quiz:', error);
  } else {
    console.log('Quiz saved successfully:', data);
  }
};
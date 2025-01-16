export type QuizDatatype = {
  questions: QuestionItem[];
  difficulty: string;
  numberOfQuestions: number;
  topic: string;
};

export type QuestionItem = {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  explanation: string;
  shuffledAnswers?: string[];
};

export type UserAnswerType = {
  question: string;
  correctAnswer: string;
  userAnswer: string;
};

export type userQuizType = {
  topic: string | undefined;
  score: number | null;
  userAnswers: UserAnswerType[];
};

export type QuizType = {
  topic: string | number;
  difficulty: string | number;
  language: string | undefined;
  numberOfQuestions: string | number;
};

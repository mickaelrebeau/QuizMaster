/* eslint-disable max-lines-per-function */
import { type QuizType, type userQuizType } from "@/types";
import { getUserId, supabase } from "@/utils/supabase";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export async function run(data: QuizType) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
You are a quiz question generator. Your task is to create a JSON object containing multiple-choice questions based on the input you receive. Ensure that the questions are unique and not repetitive. Follow the structure below:

Input:
- Topic: ${data.topic}
- Difficulty: ${data.difficulty}
- Number of Questions: ${data.numberOfQuestions}
- Language: ${data.language}

Output:
{
  "topic": "[Insert the topic from input]",
  "difficulty": "[Insert the difficulty from input]",
  "numberOfQuestions": [Insert the number of questions from input],
  "questions": [
    {
      "question": "[Insert a relevant question for the topic and difficulty]",
      "incorrectAnswers": ["[Option 1]", "[Option 2]", "[Option 3]"],
      "correctAnswer": "[Insert the correct answer]",
      "explanation": "[Explain why this is the correct answer]"
    },
    {
      "question": "[Insert another unique question]",
      "incorrectAnswers": ["[Option 1]", "[Option 2]", "[Option 3]"],
      "correctAnswer": "[Insert the correct answer]",
      "explanation": "[Explain why this is the correct answer]"
    },
    ...
  ]
}
Constraints:
- Ensure that the incorrect answers are plausible but clearly distinguishable from the correct answer.
- Avoid repeated questions or very similar phrasing.
- Avoid repeating answers.
- Align the difficulty of the questions with the specified level (e.g., "easy" questions should be straightforward, "hard" questions should be more challenging).
- Keep the questions engaging and accurate based on the topic.

Example Input:
- Topic: "Capitals"
- Difficulty: "easy"
- Number of Questions: 4

Example Output:
{
  "topic": "Capitals",
  "difficulty": "easy",
  "numberOfQuestions": 4,
  "questions": [
    {
      "question": "What is the capital of France?",
      "incorrectAnswers": ["London", "Berlin", "Madrid"],
      "correctAnswer": "Paris",
      "explanation": "Paris is the capital of France."
    },
    {
      "question": "What is the capital of Spain?",
      "incorrectAnswers": ["Paris", "London", "Berlin"],
      "correctAnswer": "Madrid",
      "explanation": "Madrid is the capital of Spain."
    },
    {
      "question": "What is the capital of Germany?",
      "incorrectAnswers": ["Paris", "London", "Madrid"],
      "correctAnswer": "Berlin",
      "explanation": "Berlin is the capital of Germany."
    },
    {
      "question": "What is the capital of England?",
      "incorrectAnswers": ["Paris", "Berlin", "Madrid"],
      "correctAnswer": "London",
      "explanation": "London is the capital of England."
    }
  ]
}

Use this format to generate quiz questions for any given topic, difficulty, and number of questions in the correct language (ex: if language = 'en' then the quiz as to be in english).
`;

  const result = await model.generateContent(prompt, {
    safetySettings: [
      {
        category: HarmCategory.DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
      },
    ],
  });
  const response = await result.response;
  const text = response.text();

  return text;
}

export const getUserQuizzes = async () => {
  const userId = await getUserId();
  const { data, error } = await supabase
    .from('users-quizzes')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user quizzes:', error);
    return [];
  }

  return data as userQuizType[];
};

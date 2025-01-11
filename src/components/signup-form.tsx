import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import * as z from 'zod';

import { Button, ControlledInput, Text, View } from '@/components/ui';
import { translate } from '@/lib';

// Validation Schema
const schema = z
  .object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .min(2, 'Name must be at least 2 characters'),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Invalid email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z
      .string({
        required_error: 'Please confirm your password',
      })
      .min(6, 'Password must be at least 6 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type FormType = z.infer<typeof schema>;

export type SignupFormProps = {
  onSubmit?: SubmitHandler<FormType>;
};

export const SignupForm = ({ onSubmit = () => {} }: SignupFormProps) => {
  const { handleSubmit, control } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-4">
        <View className="items-center justify-center">
          <Text
            testID="form-title"
            className="pb-6 text-center text-4xl font-bold"
          >
            {translate('signup.title')}
          </Text>

          <Text className="mb-6 max-w-xs text-center text-gray-500">
            {translate('signup.description')}
          </Text>
        </View>

        <ControlledInput
          testID="name-input"
          control={control}
          name="name"
          label={translate('signup.name')}
          placeholder="Your full name"
        />

        <ControlledInput
          testID="email-input"
          control={control}
          name="email"
          label={translate('signup.email')}
          placeholder="example@mail.com"
        />

        <ControlledInput
          testID="password-input"
          control={control}
          name="password"
          label={translate('signup.password')}
          placeholder="***"
          secureTextEntry={true}
        />

        <ControlledInput
          testID="confirm-password-input"
          control={control}
          name="confirmPassword"
          label={translate('signup.passwordConfirm')}
          placeholder="***"
          secureTextEntry={true}
        />

        <Button
          className="mt-6 rounded-xl"
          testID="signup-button"
          label={translate('signup.signup')}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

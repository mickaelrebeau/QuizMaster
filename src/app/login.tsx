import { useRouter } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { translate, useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();

  const onSubmit: LoginFormProps['onSubmit'] = async (data) => {
    try {
      await signIn(data);
      router.push('/home');
    } catch (error) {
      showMessage({
        message: translate('login.message-fail'),
        type: 'danger',
      });
    }
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
}

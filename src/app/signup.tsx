import { useRouter } from 'expo-router';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import type { SignupFormProps } from '@/components/signup-form';
import { SignupForm } from '@/components/signup-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { translate, useAuth } from '@/lib';

export default function Signup() {
  const router = useRouter();
  const signUp = useAuth.use.signUp(); 

  const onSubmit: SignupFormProps['onSubmit'] = async (data) => {
    console.log(data);
    try {
      await signUp(data);
      showMessage({
        message: translate('signup.message-success'),
        type: 'success',
      });
      router.push('/login');
    } catch (error) { 
      showMessage({
        message: translate('signup.message-fail'),
        type: 'danger',
      });
    } 
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}

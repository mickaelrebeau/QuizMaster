import { useRouter } from 'expo-router';
import React from 'react';

import type { SignupFormProps } from '@/components/signup-form';
import { SignupForm } from '@/components/signup-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Signup() {
  const router = useRouter();
  const signUp = useAuth.use.signUp(); // Assuming `useAuth` has a `signUp` method

  const onSubmit: SignupFormProps['onSubmit'] = (data) => {
    console.log(data);
    signUp({ ...data }); // Replace with appropriate sign-up logic
    router.push('/login'); // Redirect to login after successful signup
  };

  return (
    <>
      <FocusAwareStatusBar />
      <SignupForm onSubmit={onSubmit} />
    </>
  );
}

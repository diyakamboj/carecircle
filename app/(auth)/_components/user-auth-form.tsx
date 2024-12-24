'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import * as z from 'zod';
import {
  useGoogleLogin,
  useGithubLogin,
  useEmailPasswordLogin
} from '@/firebase/firebase';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

const UserAuthForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const {
    login: googleLogin,
    isPending: isPendingGoogleLogin,
    error: errorGoogleLogin
  } = useGoogleLogin();
  const {
    login: githubLogin,
    isPending: isPendingGithubLogin,
    error: errorGithubLogin
  } = useGithubLogin();
  const {
    login: emailPasswordLogin,
    isPending: isPendingEmailPasswordLogin,
    error: errorEmailPasswordLogin
  } = useEmailPasswordLogin();

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      await emailPasswordLogin(data.email, data.password);
    } catch (error) {
      // Error handling is already done in the hook
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading || isPendingEmailPasswordLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading || isPendingEmailPasswordLogin}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading || isPendingEmailPasswordLogin}
            className="bg-theme ml-auto w-full text-white"
            type="submit"
          >
            {isPendingEmailPasswordLogin
              ? 'Logging in...'
              : 'Continue With Email'}
          </Button>
          {errorEmailPasswordLogin && <p>{errorEmailPasswordLogin}</p>}
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="google-login flex-1">
          <Button
            onClick={googleLogin}
            disabled={isPendingGoogleLogin}
            className="bg-theme flex w-full items-center justify-center text-white"
          >
            {/* Unicode for globe icon */}
            {isPendingGoogleLogin ? 'Logging in...' : 'Login with Google'}
          </Button>
          {errorGoogleLogin && <p>{errorGoogleLogin}</p>}
        </div>
        <div className="github-login flex-1">
          <Button
            onClick={githubLogin}
            disabled={isPendingGithubLogin}
            className="bg-theme flex w-full items-center justify-center text-white"
          >
            {/* Unicode for GitHub icon */}
            {isPendingGithubLogin ? 'Logging in...' : 'Login with GitHub'}
          </Button>
          {errorGithubLogin && <p>{errorGithubLogin}</p>}
        </div>
      </div>
    </>
  );
};

export default UserAuthForm;

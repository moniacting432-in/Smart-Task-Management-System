'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext'; 
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { login, register, loginWithGoogle, user } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); 
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
    } catch (error) {
      console.error('Auth error:', error.message);

     
      if (error.code === 'auth/email-already-in-use') {
        setErrorMsg('This email is already registered. Please log in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setErrorMsg('Please enter a valid email address.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMsg('Incorrect password. Try again.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMsg('No account found with this email.');
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg('Password should be at least 6 characters.');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-xl p-8'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-2'>
          {isLogin ? 'Welcome Back!' : 'Create an Account'}
        </h2>
        <p className='text-center text-gray-500 mb-6 text-sm'>
          {isLogin
            ? 'Please enter your credentials.'
            : 'Please fill in the details to create an account.'}
        </p>

        <form className='space-y-5' onSubmit={handleSubmit}>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />

          {errorMsg && (
            <p className='text-red-500 text-sm text-center'>{errorMsg}</p>
          )}

          <button
            type='submit'
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-lg transition duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-500 hover:bg-indigo-700 text-white'
            }`}
          >
            {loading
              ? 'Please wait...'
              : isLogin
              ? 'Login'
              : 'Register'}
          </button>
        </form>

        <div className='flex items-center my-6'>
          <hr className='flex-1 border-gray-300' />
          <span className='mx-4 text-gray-500'>or</span>
          <hr className='flex-1 border-gray-300' />
        </div>

        <button
          onClick={loginWithGoogle}
          className='w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition duration-300'
        >
          <img
            src='https://www.svgrepo.com/show/475656/google-color.svg'
            alt='Google Logo'
            className='w-5 h-5'
          />
          <span className='text-sm font-medium'>
            {isLogin ? 'Login with Google' : 'Sign up with Google'}
          </span>
        </button>

        <p className='mt-6 text-center text-sm text-gray-500'>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className='text-blue-500 font-semibold ml-1'
            type='button'
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

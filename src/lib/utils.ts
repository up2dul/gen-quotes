import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { UserResponse } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function setUserData(data: UserResponse) {
  localStorage.setItem('userData', JSON.stringify(data));
}

export function getUserData() {
  return JSON.parse(localStorage.getItem('userData') || '{}') as UserResponse;
}

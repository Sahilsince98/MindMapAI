import { User, LoginCredentials } from '../types';

const USERS_KEY = 'kids_app_users';

export const registerUser = (userData: User): void => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    users.push(userData);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    // Store current user email for later use
    localStorage.setItem('current_user_email', userData.email);
  } catch (error) {
    console.error('Error registering user:', error);
    throw new Error('Failed to register user');
  }
};

export const loginUser = (credentials: LoginCredentials): User | null => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(
      (u: User) => u.email === credentials.email && u.password === credentials.password
    );
    if (user) {
      // Store current user email for later use
      localStorage.setItem('current_user_email', credentials.email);
    }
    return user || null;
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};
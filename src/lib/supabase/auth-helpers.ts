
import supabase from './client';
import prisma from '../../lib/prisma';

export type User = {
  id: string;
  email?: string;
  username?: string;
  avatar_url?: string;
};

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Create user in Prisma if signup succeeded
  if (data.user) {
    await prisma.user.create({
      data: {
        id: data.user.id,
        email: data.user.email || '',
        username: email.split('@')[0], // Default username from email
      },
    });
  }
  
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  
  if (error) throw error;
}

export async function updateProfile(user: Partial<User>) {
  // Update in Supabase auth if it's just for email
  if (user.email) {
    const { error } = await supabase.auth.updateUser({
      email: user.email,
    });
    
    if (error) throw error;
  }
  
  // Update user in Prisma database
  const { data, error } = await prisma.user.update({
    where: { id: user.id },
    data: {
      username: user.username,
      avatar_url: user.avatar_url,
    },
  });
    
  if (error) throw error;
  
  return data;
}

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  // Get the user profile from Prisma
  try {
    const userData = await prisma.user.findUnique({
      where: { id: user.id },
    });
    
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

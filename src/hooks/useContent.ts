
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getContents, 
  getContentById, 
  getMovies, 
  getTVShows, 
  getAnime, 
  getCartoons,
  ContentParams
} from '../api/content';
import { getCurrentUser } from '../lib/supabase/auth-helpers';
import { addToFavorites, removeFromFavorites, isFavorite } from '../api/favorites';
import { addToWatchHistory, getWatchProgress } from '../api/watchHistory';
import { ContentType } from '@prisma/client';

export const useContents = (params: ContentParams = {}) => {
  return useQuery({
    queryKey: ['contents', params],
    queryFn: () => getContents(params),
  });
};

export const useContent = (id: string) => {
  return useQuery({
    queryKey: ['content', id],
    queryFn: () => getContentById(id),
    enabled: !!id,
  });
};

export const useMovies = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['movies', { limit, offset }],
    queryFn: () => getMovies(limit, offset),
  });
};

export const useShows = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['shows', { limit, offset }],
    queryFn: () => getTVShows(limit, offset),
  });
};

export const useAnime = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['anime', { limit, offset }],
    queryFn: () => getAnime(limit, offset),
  });
};

export const useCartoons = (limit = 20, offset = 0) => {
  return useQuery({
    queryKey: ['cartoons', { limit, offset }],
    queryFn: () => getCartoons(limit, offset),
  });
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contentId }: { contentId: string }) => {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');
      return addToFavorites(user.id, contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ contentId }: { contentId: string }) => {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');
      return removeFromFavorites(user.id, contentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
};

export const useIsFavorite = (contentId: string) => {
  return useQuery({
    queryKey: ['isFavorite', contentId],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) return false;
      return isFavorite(user.id, contentId);
    },
    enabled: !!contentId,
  });
};

export const useAddToWatchHistory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ 
      contentId, 
      progress, 
      completed 
    }: { 
      contentId: string; 
      progress: number; 
      completed?: boolean;
    }) => {
      const user = await getCurrentUser();
      if (!user) throw new Error('User not authenticated');
      return addToWatchHistory(user.id, contentId, progress, completed);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchHistory'] });
    },
  });
};

export const useWatchProgress = (contentId: string) => {
  return useQuery({
    queryKey: ['watchProgress', contentId],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) return { progress: 0, completed: false };
      return getWatchProgress(user.id, contentId);
    },
    enabled: !!contentId,
  });
};

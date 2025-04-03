
import prisma from '../lib/prisma';

export const getFavorites = async (userId: string) => {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        user_id: userId,
      },
      include: {
        content: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    
    return favorites.map(fav => fav.content);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw new Error('Failed to fetch favorites');
  }
};

export const addToFavorites = async (userId: string, contentId: string) => {
  try {
    const favorite = await prisma.favorite.create({
      data: {
        user_id: userId,
        content_id: contentId,
      },
      include: {
        content: true,
      },
    });
    
    return favorite;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    throw new Error('Failed to add to favorites');
  }
};

export const removeFromFavorites = async (userId: string, contentId: string) => {
  try {
    await prisma.favorite.delete({
      where: {
        user_id_content_id: {
          user_id: userId,
          content_id: contentId,
        },
      },
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error removing from favorites:', error);
    throw new Error('Failed to remove from favorites');
  }
};

export const isFavorite = async (userId: string, contentId: string) => {
  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        user_id_content_id: {
          user_id: userId,
          content_id: contentId,
        },
      },
    });
    
    return !!favorite;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    throw new Error('Failed to check favorite status');
  }
};

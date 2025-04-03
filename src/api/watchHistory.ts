
import prisma from '../lib/prisma';

export const getWatchHistory = async (userId: string) => {
  try {
    const history = await prisma.watchHistory.findMany({
      where: {
        user_id: userId,
      },
      include: {
        content: true,
      },
      orderBy: {
        watched_at: 'desc',
      },
    });
    
    return history;
  } catch (error) {
    console.error('Error fetching watch history:', error);
    throw new Error('Failed to fetch watch history');
  }
};

export const addToWatchHistory = async (
  userId: string, 
  contentId: string, 
  progress: number, 
  completed: boolean = false
) => {
  try {
    // First try to update if exists
    const existing = await prisma.watchHistory.findUnique({
      where: {
        user_id_content_id: {
          user_id: userId,
          content_id: contentId,
        },
      },
    });
    
    if (existing) {
      return prisma.watchHistory.update({
        where: {
          id: existing.id,
        },
        data: {
          progress,
          completed,
          watched_at: new Date(),
        },
        include: {
          content: true,
        },
      });
    }
    
    // Create new entry if doesn't exist
    return prisma.watchHistory.create({
      data: {
        user_id: userId,
        content_id: contentId,
        progress,
        completed,
      },
      include: {
        content: true,
      },
    });
  } catch (error) {
    console.error('Error updating watch history:', error);
    throw new Error('Failed to update watch history');
  }
};

export const getWatchProgress = async (userId: string, contentId: string) => {
  try {
    const progress = await prisma.watchHistory.findUnique({
      where: {
        user_id_content_id: {
          user_id: userId,
          content_id: contentId,
        },
      },
    });
    
    return progress || { progress: 0, completed: false };
  } catch (error) {
    console.error('Error fetching watch progress:', error);
    throw new Error('Failed to fetch watch progress');
  }
};

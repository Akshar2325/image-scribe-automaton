
import prisma from '../lib/prisma';
import { ContentType } from '@prisma/client';

export interface ContentParams {
  type?: ContentType;
  genre?: string;
  search?: string;
  limit?: number;
  offset?: number;
}

export const getContents = async (params: ContentParams = {}) => {
  const { type, genre, search, limit = 20, offset = 0 } = params;
  
  const where: any = {};
  
  if (type) {
    where.content_type = type;
  }
  
  if (genre) {
    where.genre = {
      has: genre
    };
  }
  
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  try {
    const contents = await prisma.content.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: {
        release_date: 'desc',
      },
    });
    
    const total = await prisma.content.count({ where });
    
    return {
      data: contents,
      metadata: {
        total,
        limit,
        offset,
      },
    };
  } catch (error) {
    console.error('Error fetching contents:', error);
    throw new Error('Failed to fetch contents');
  }
};

export const getContentById = async (id: string) => {
  try {
    const content = await prisma.content.findUnique({
      where: { id },
    });
    
    if (!content) {
      throw new Error('Content not found');
    }
    
    return content;
  } catch (error) {
    console.error('Error fetching content by ID:', error);
    throw new Error('Failed to fetch content');
  }
};

export const getContentByType = async (type: ContentType, limit = 20, offset = 0) => {
  return getContents({ type, limit, offset });
};

export const getMovies = async (limit = 20, offset = 0) => {
  return getContentByType(ContentType.MOVIE, limit, offset);
};

export const getTVShows = async (limit = 20, offset = 0) => {
  return getContentByType(ContentType.SHOW, limit, offset);
};

export const getAnime = async (limit = 20, offset = 0) => {
  return getContentByType(ContentType.ANIME, limit, offset);
};

export const getCartoons = async (limit = 20, offset = 0) => {
  return getContentByType(ContentType.CARTOON, limit, offset);
};

export const searchContents = async (query: string, limit = 20, offset = 0) => {
  return getContents({ search: query, limit, offset });
};

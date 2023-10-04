import HttpError from '@wasp/core/HttpError.js'

export const getArticles = async (args, context) => {
  const articles = await context.entities.Article.findMany({
    orderBy: { publishedAt: 'desc' },
    take: args.limit
  });

  return articles;
}

export const getSavedArticles = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Article.findMany({
    where: {
      user: { id: context.user.id }
    }
  });
}
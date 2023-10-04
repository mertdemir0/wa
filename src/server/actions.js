import HttpError from '@wasp/core/HttpError.js'


export const saveArticle = async ({ articleId }, context) => {
  if (!context.user) { throw new HttpError(401) };

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id }
  });

  const article = await context.entities.Article.findUnique({
    where: { id: articleId }
  });

  if (!article) { throw new HttpError(404, 'Article not found.') };

  await context.entities.User.update({
    where: { id: user.id },
    data: { savedArticles: { connect: { id: article.id } } }
  });

  return user;
}

export const unloadArticle = async ({ articleId }, context) => {
  if (!context.user) { throw new HttpError(401) }

  const user = await context.entities.User.findUnique({
    where: { id: context.user.id },
    include: { savedArticles: true }
  });

  await context.entities.User.update({
    where: { id: context.user.id },
    data: { savedArticles: { disconnect: { id: articleId } } } }
  );

  return true;
}

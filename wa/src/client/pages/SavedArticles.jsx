import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getSavedArticles from '@wasp/queries/getSavedArticles';
import unloadArticle from '@wasp/actions/unloadArticle';

export function SavedArticles() {
  const { data: savedArticles, isLoading, error } = useQuery(getSavedArticles);
  const unloadArticleFn = useAction(unloadArticle);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleUnloadArticle = (articleId) => {
    unloadArticleFn({ articleId });
  };

  return (
    <div className='p-4'>
      {savedArticles.map((article) => (
        <div
          key={article.id}
          className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
        >
          <div>{article.title}</div>
          <div>{article.author}</div>
          <button
            onClick={() => handleUnloadArticle(article.id)}
            className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
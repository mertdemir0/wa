import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAction } from '@wasp/actions';
import { useQuery } from '@wasp/queries';
import saveArticle from '@wasp/actions/saveArticle';
import unloadArticle from '@wasp/actions/unloadArticle';

export function Article() {
  const { articleId } = useParams();
  const { data: article, isLoading, error } = useQuery(getArticle, { articleId });
  const saveArticleFn = useAction(saveArticle);
  const unloadArticleFn = useAction(unloadArticle);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleSaveArticle = () => {
    saveArticleFn({ articleId });
  };

  const handleUnloadArticle = () => {
    unloadArticleFn({ articleId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>{article.title}</h1>
      <p>{article.content}</p>
      <div className='mt-4'>
        <button
          onClick={handleSaveArticle}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2'
        >
          Save
        </button>
        <button
          onClick={handleUnloadArticle}
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
        >
          Unload
        </button>
      </div>
    </div>
  );
}
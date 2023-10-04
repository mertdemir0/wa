import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getArticles from '@wasp/queries/getArticles';

export function Home() {
  const { data: articles, isLoading, error } = useQuery(getArticles);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {articles.map((article) => (
        <div
          key={article.id}
          className='bg-white p-4 mb-4 rounded-lg'
        >
          <h2 className='text-xl font-bold mb-2'>{article.title}</h2>
          <p>{article.content}</p>
          <Link
            to={`/article/${article.id}`} // added dynamic link
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2' // added some styling
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
}
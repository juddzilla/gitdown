import type { ReactElement } from 'react';
import API from '../interfaces/host';
import { useLoaderData } from 'react-router-dom';
import { marked } from 'marked';

import Metadata from './document/metadata';

const Component = (): ReactElement => {
  const data = useLoaderData();
  return (
      <div className="flex">
        <div className="flex flex-1 justify-center bg-slate-50 px-4">
          <div className="max-w-prose pt-8">
            <h1 className='border-b-2 border-slate-800 border-solid'>{ data.document.title || 'Untitled' }</h1>
            <div dangerouslySetInnerHTML={{__html: marked.parse(data.md.body)}}/>
          </div>
        </div>
        { Metadata(data.document) }
      </div>
  )
};

const Route = {
  element: <Component />,
  loader: async ({ params }) => {
    return await API.DocumentById({ id: params.id });
  },
  path: "/documents/:id",
};

export default Route;
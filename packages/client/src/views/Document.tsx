import { useState } from 'react';
import type { ReactElement } from 'react';
import { useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';
import Metadata from './document/create/metadata';
import WYSIWYG from '../components/editor';

const Component = (): ReactElement => {
  const data = useLoaderData();
  const [metadata, setMetadata] = useState(data.metadata);
  const [content, setContent] = useState(data.html);

  const save = async () => {
    try {
      await API.DocumentUpdate({
        id: metadata.id,
        html: content,
        metadata
      });
    } catch (err) {
      console.log('SAVE RR', err);
    }
  };

  function titleChange({ target }) {
    setMetadata({ ...metadata, title: target.value });
  }

  return (
      <>
        <div className="">
          <div className='w-full text-sm uppercase mb-2 mt-1'>Create Document</div>

          <div className='flex'>
            <div className="bg-slate-50 p-6">
              <div className="max-w-prose">
                <div className='mb-6'>
                  <input
                      className='outline-none text-4xl p-2 bg-transparent w-full font-extrabold border-b-2 border-slate-800 border-solid'
                      onChange={ titleChange }
                      placeholder='Title'
                      type="text"
                      value={metadata.title}
                  />
                </div>
                <WYSIWYG content={ content } update={ setContent }/>
              </div>
            </div>

            <Metadata
                metadata={ metadata }
                save={ save }
                update={ setMetadata }
            />
          </div>
        </div>
      </>
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
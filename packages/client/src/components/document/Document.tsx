import { useState } from 'react';
import type { ReactElement } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

import Metadata from './Metadata';
import WYSIWYG from './editor';

const Component = ({ onSave }): ReactElement => {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [metadata, setMetadata] = useState(data.metadata);
  const [content, setContent] = useState(data.html);
  const [canSave, setCanSave] = useState(false)

  const save = async () => {
    try {
      const response = await onSave({
        id: metadata.id,
        content,
        metadata
      });

      if (Object.hasOwn(response, 'created')) {
        navigate(`/documents/${response.created}`);
      }
      setCanSave(false);
    } catch (err) {
      console.log('SAVE RR', err);
      setCanSave(false);
    }
  };

  function updateMetadata(metadata) {
    setMetadata(metadata);
    const canSave = metadata.title && metadata.title.trim().length;
    setCanSave(canSave);
  }

  function titleChange({ target }) {
    updateMetadata({ ...metadata, title: target.value });
  }

  function updateContent(html) {
    setCanSave(true);
    setContent(html);
  }

  // const title = `${} - ${ metadata.type }`;

  return (
      <>
        <div className='w-full text-md'>{ metadata.project }</div>
        <div className='flex mb-3'>
          <div className='flex items-center  w-full max-w-prose'>
            <div className={`flex rounded h-12 w-12 mr-2 justify-center items-center text-white bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary  font-bold capitalize`}>
              { metadata.type[0] }
            </div>
            <input
                className='border-b-2 border-solid border-slate-800 outline-none text-4xl bg-transparent w-full font-extrabold'
                onChange={ titleChange }
                placeholder='Title'
                type="text"
                value={metadata.title}
            />
          </div>

          <div className='w-64 ml-4'>
            <button
                className={`
                border border-8 border-solid rounded-md uppercase
                disabled:text-stone-300 disabled:bg-slate-50 disabled:border-slate-100 disabled:shadow-none
                bg-${metadata.type.replace(' ', '-').toLowerCase()}-secondary border-${metadata.type.replace(' ', '-').toLowerCase()}-primary disabled:shadow-none
                h-12 w-full`}
                disabled={ !canSave }
                onClick={ save }
            >
              Save
            </button>
          </div>
        </div>
        <div className='flex'>
          <div className="max-w-prose w-full">
            <WYSIWYG content={ content } update={ updateContent }/>
          </div>

          <div className='ml-4'>
            <Metadata
                list={ data.list }
                metadata={ metadata }
                update={ updateMetadata }
            />
          </div>
        </div>
      </>
  )
};
export default Component;
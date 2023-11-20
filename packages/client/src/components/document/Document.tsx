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
    const canSave = metadata.title && metadata.title.trim().length && metadata.status && metadata.status.trim().length;
    setCanSave(canSave);
  }

  function titleChange({ target }) {
    updateMetadata({ ...metadata, title: target.value });
  }

  function updateContent(html) {
    setCanSave(true);
    setContent(html);
  }

  return (
      <div className='ml-4'>
        <div className='flex mb-3'>
          <div className='flex items-center  w-full max-w-prose'>
            <div className={`flex rounded h-14 w-14 mr-2 justify-center items-center text-white bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary font-bold text-xl capitalize`}>
              { metadata.type[0] }
            </div>
            <div className='w-full'>
              <div className='w-full text-md'>{ metadata.project }</div>
              <input
                  className='border-b-2 border-solid border-slate-800 outline-none text-4xl bg-transparent w-full font-extrabold'
                  onChange={ titleChange }
                  placeholder='Title'
                  type="text"
                  value={metadata.title}
              />
            </div>
          </div>

          <div className='w-64 ml-8 flex items-center'>
            <button
                className={`
                rounded-md uppercase text-white
                disabled:text-stone-400 disabled:bg-slate-50 disabled:border-slate-100 disabled:shadow-none
                bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary border-${metadata.type.replace(' ', '-').toLowerCase()}-secondary disabled:shadow-none
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

          <div className='ml-8'>
            <Metadata
                list={ data.list }
                metadata={ metadata }
                update={ updateMetadata }
            />
          </div>
        </div>
      </div>
  )
};
export default Component;
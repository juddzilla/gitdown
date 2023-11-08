import { useState } from 'react';
import type { ReactElement } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import API from '../../../interfaces/host';
import Metadata from './metadata';

import Editor from '../../../components/editor';

const Component = (): ReactElement => {
  const data = useLoaderData();
  console.log('DATA', data);
  const [state, setState] = useState({
    title: '',
    project: '',
    tags: [],
    users: [],
    type: null,
    priority: null,
    status: null,
  });
  function titleChange({ target }) {
    setState({ ...state, title: target.value });
  }

  function onSelectChange(key, { target }) {
    console.log('ky', key);
    console.log('val', target.value);
    // setState({ ...state, project: target.value });
  }

  const Select = (config): ReactElement => {
    const { key, options, value } = config;
    return (
        <select value={value} onChange={ onSelectChange.bind(null, key) }>
          { options.map((option, index) => (
              <option value={option} key={index}>
                { option }
              </option>
          ))}
        </select>
    );
  };
  return (
      <>
        <div className="flex">
          <div>
            <h4 className='uppercase'>Create Document</h4>

            <div className="flex flex-1 bg-slate-50 p-4">
              <div className="max-w-prose">
                <div className='mb-2'>
                   <input
                       className='outline-none text-4xl p-2 bg-transparent w-full font-extrabold border-b-2 border-slate-800 border-solid'
                       onChange={ titleChange }
                       placeholder='Title'
                       type="text"
                       value={state.title}
                   />
                </div>

                <div>
                  <Editor />
                </div>
              </div>

            </div>
          </div>
          <Metadata />
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    return await API.Lists();
  },
  path: "/create/document",
};

export default Route;
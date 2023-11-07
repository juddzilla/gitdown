import { useState } from 'react';
import type { ReactElement } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import API from '../../../interfaces/host';
import Metadata from './metadata';

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
      // <>
      //   <h1>
      //     Create new doc
      //   </h1>
      //   <div>
      //     <input
      //         className=""
      //         onChange={ titleChange }
      //         placeholder='Title'
      //         type="text"
      //         value={state.title}
      //     />
      //   </div>
      //   <div>
      //     <h2>Projects</h2>
      //     { Select({ key: 'project', options: data.projects, value: state.project }) }
      //   </div>
      //   <div>
      //     <h2>Tags</h2>
      //   </div>
      //   <div>Users Select</div>
      //   <div>
      //     <h2>Type</h2>
      //     { Select({ key: 'type', options: data.types, value: state.type }) }
      //   </div>
      //   <div>
      //     <h2>Priority</h2>
      //     { Select({ key: 'priority', options: data.priorities, value: state.priority }) }
      //   </div>
      //   <div>
      //     <h2>Status</h2>
      //     { Select({ key: 'status', options: data.statuses, value: state.status }) }
      //   </div>
      // </>
      <>
        <div className="flex">
          <div className="flex flex-1 bg-slate-50 px-4">
            <div className="max-w-prose">
              <h4 className='uppercase'>Create Document</h4>
              {/*<h1 className='border-b-2 border-slate-800 border-solid'>{ data.document.title || 'Untitled' }</h1>*/}
              <div>
                <label>
                  Title
                 <input
                     className=""
                     onChange={ titleChange }
                     placeholder='Title'
                     type="text"
                     value={state.title}
                 />
                </label>
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
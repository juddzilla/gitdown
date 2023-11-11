import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import API from '../../../interfaces/host';

import SelectOne from '../metadata/single-select';
import SelectMulti from '../metadata/multi-select';

export default (params): ReactElement => {
  const { metadata, update } = params;

  const [list, setList] = useState({
    priorities: [],
    projects: [],
    statuses: [],
    tags: [],
    types: [],
    users: [],
  });

  useEffect(() => {
    // const fetchData = async () => await API.Lists();
    // const response = API.Lists();
    API.Lists().then(res => {
      setList(res);
    });

  }, [setList]);

  function onSelectChange(key, { target }) {
    update({ ...metadata, [key]: target.value });
    // setState({ ...state, project: target.value });
  }

  function onChoice(selection) {
    update({ ...metadata, ...selection });
  }

  const Select = (config): ReactElement => {
    const { key, options, value } = config;
    return (
        <select value={value} onChange={ onSelectChange.bind(null, key) }>
          <option value='' key='blank'>
            -- select --
          </option>
          { options.map((option, index) => (
              <option value={option} key={index}>
                { option }
              </option>
          ))}
        </select>
    );
  };

  function updateProperty(value) {
    update({ ...metadata, ...value });
  }

  return (
      <div className="">
        <div className='bg-slate-100 py-4 px-4 w-72 mb-4'>
          {
            SelectOne({
              options: list.projects,
              property: 'project',
              selected: metadata.project,
              setSelected: onChoice,
              title: 'Projects',
              update: updateProperty,
            })
          }
        </div>
        <div className='bg-slate-100 py-4 px-4 w-72 mb-4'>
          {
            SelectOne({
              options: list.types,
              property: 'type',
              selected: metadata.type,
              setSelected: onChoice,
              title: 'Type',
              update: updateProperty,
            })
          }
          { ['Bug', 'Task'].includes(metadata.type) &&
              <div>
                conditional Due
              </div>
          }
        </div>
        <div className='bg-slate-100 py-4 px-4 w-72 mb-4'>
          {
            SelectOne({
              options: list.statuses,
              property: 'status',
              selected: metadata.status,
              setSelected: onChoice,
              title: 'Status',
              update: updateProperty,
            })
          }
        </div>
        <div className='bg-slate-100 py-4 px-4 w-72 mb-4'>
          {
            SelectMulti({
              options: list.tags,
              property: 'tags',
              selected: metadata.tags,
              setSelected: onChoice,
              title: 'Tags',
              update: updateProperty,
            })
          }
        </div>
        <div className='bg-slate-100 py-4 px-4 w-72 mb-4'>
          {
            SelectMulti({
              options: list.users,
              property: 'users',
              selected: metadata.users,
              setSelected: onChoice,
              title: 'Users',
              update: updateProperty,
            })
          }
        </div>
      </div>
  );
}

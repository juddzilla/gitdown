import { useEffect, useState } from 'react';
import type { ReactElement } from 'react';

import API from '../../../interfaces/host';

export default (params): ReactElement => {
  const { metadata, save, update } = params;
  console.log('SSS', params);

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
      console.log('res', res);
      setList(res);
    });

  }, [setList]);

  function onSelectChange(key, { target }) {
    console.log('ky', key);
    console.log('val', target.value);
    update({ ...metadata, [key]: target.value });
    // setState({ ...state, project: target.value });
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

  const SelectArrayOfObj = (config): ReactElement => {
    const { key, options, value } = config;
    return (
        <select value={value} onChange={ onSelectChange.bind(null, key) }>
          <option value='' key='blank'>
            -- select --
          </option>
          { options.map((option, index) => (
              <option value={option.name} key={index}>
                { option.name }
              </option>
          ))}
        </select>
    );
  };

  return (
      <div className="bg-slate-100 py-10 px-4 w-72 ml-4">
        <div onClick={save}>
          Save
        </div>
        <div>
          Projects
          {
            SelectArrayOfObj({ key: 'project', options: list.projects, value: metadata.project })
          }
        </div>
        <div>
          Types
          {
            Select({ key: 'type', options: list.types, value: metadata.type })
          }
        </div>
        <div>
          Statuses
          {
            Select({ key: 'status', options: list.statuses, value: metadata.status })
          }
        </div>
        <div>
          Tags
        </div>
        <div>
          Users
        </div>
        <div>
          conditional Due
        </div>
      </div>
  );
}

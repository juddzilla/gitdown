import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';

const initialState = { name: '' };

const Component = () => {
  const initialData = useLoaderData();
  const [state, setState] = useState(initialState);
  const [list, setList] = useState(initialData)

  const submitForm = async (state) => {
    console.log('state', state);
    try {
      const response = await API.TagCreate(state);
      console.log('response', response);
      if (Object.hasOwn(response, 'error')) {
        console.log('successful error', response.error);
        return;
      }
      list.push(response);

      setList([...list]);
      setState(initialState);

    } catch (err) {
      console.warn('ERR', err);
    }
  };

  function onChange(e) {
    setState({ name: e.target.value });
  }

  return (
      <>
        <div>
          <h1>Tags</h1>
        </div>
        <div>
          <input
              onChange={ onChange }
              type="text"
              value={ state.name }
          />
          <button onClick={submitForm.bind(null, state)}>Submit</button>
        </div>
        <div>
          { list.map((item, index) => (
              <div key={index}>
                <Link to={`/tags/${item.name}`}>
                  { item.name }
                </Link>
              </div>
          ))}
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    return await API.Tags();
  },
  path: "/tags",
};

export default Route;
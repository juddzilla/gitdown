import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';

const submitForm = (state) => {
  console.log('state', state);
};

const Component = () => {
  const [state, setState] = useState({ name: '' });
  const projects = useLoaderData();

  function onChange(e) {
    setState({ name: e.target.value });
  }
  return (
      <>
        <div>
          <h1>Projects</h1>
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
          { projects.map((project, index) => (
            <div key={index}>
              <Link to={`/projects/${project}`}>
                { project }
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
    return await API.Projects();
  },
  path: "/projects",
};

export default Route;
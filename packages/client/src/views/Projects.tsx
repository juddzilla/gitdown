import { useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';

import API from '../interfaces/host';

const Component = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const [create, setCreate] = useState('');
  const { results, types } = data;

  function createProject() {
    console.log('crete', create);
    navigate(create);
  }

  return (
      <>
        <div>
          <h1>Projects</h1>
        </div>
        <div>
          Create New:
          <input value={ create } onChange={ ({ target}) => setCreate(target.value) }/>
          <button onClick={ createProject } disabled={ !create.trim().length }>Submit</button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {
                  types.map(type => (
                    <th key={ type }>{ type }</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(results).map(([key, value]) => {
                  return (
                    <tr key={ key }>
                      <td>
                        <Link to={`/projects/${key}`}>
                          { key }
                        </Link>
                      </td>
                      {
                        types.map(type => (
                            <td key={type}>
                              { value[type] }
                            </td>
                        ))
                      }
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
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
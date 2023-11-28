import { useState } from 'react';
import { Link, useNavigate, useLoaderData } from 'react-router-dom';
import Table from '../styles/tables';

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
          <input value={ create } onChange={ ({ target}) => setCreate(target.value) } className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="This is placeholder" />
          <button onClick={ createProject } disabled={ !create.trim().length }>Submit</button>
        </div>
        <div className={ Table.container }>
          <table className={ Table.table }>
            <thead>
              <tr className={ Table.theadTr }>
                <th className={ Table.th }>Name</th>
                {
                  types.map(type => (
                    <th className={ Table.th } key={ type }>{ type }</th>
                  ))
                }
              </tr>
            </thead>
            <tbody>
              {
                Object.entries(results).map(([key, value]) => {
                  return (
                    <tr key={ key }>
                      <td className={ Table.td }>
                        <Link to={`/projects/${key}`} className={ Table.a }>
                          { key }
                        </Link>
                      </td>
                      {
                        types.map(type => (
                            <td key={type}  className={ Table.td }>
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
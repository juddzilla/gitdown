import type { ReactElement } from 'react';
import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';

import Table from '../styles/tables';

const emptyValue = (): ReactElement => (
    <span>--</span>
);

const plainText = (value):ReactElement => {
  if (!value) {
    return emptyValue();
  }
  return (
      <span>{ value }</span>
  );
};

const dateField = (date):ReactElement => {
  if (!date) {
    return emptyValue();
  }
  return (
      <span>{ moment(date).format('MMMM Do, YYYY') }</span>
  )
};

const columns = [
  {
    component: plainText,
    display: 'title',
    key: 'title',
  },
  {
    component: plainText,
    display: 'type',
    key: 'type',
  },
  {
    component: plainText,
    display: 'priority',
    key: 'priority',
  },
  {
    component: plainText,
    display: 'status',
    key: 'status',
  },
  {
    component: dateField,
    display: 'Last Updated',
    key: 'updated',
  },
  {
    component: dateField,
    display: 'Due On',
    key: 'due',
  },
];

const Component = () => {
  const data = useLoaderData();
  const { project, results, types } = data;
  return (
      <>
        <div>
          <h1>{ project }</h1>
        </div>
        <div>
          Create New
          { types.map((type, index) => (
              <Link to={`/document/create?project=${project}&type=${type.replace(' ', '-').toLowerCase()}`} key={index}>[{ type }]</Link>
          ))}
        </div>
        <div className='w-3/4'>

          <div className={ Table.container }>
            <table className={ Table.table }>
              <thead>
                <tr>
                  { columns.map((column, index) => (
                      <th key={index} className={ Table.th }>{ column.key }</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {
                  results.map((row, index) => {
                    return (
                        <tr key={index} className={ Table.tbodyTr }>
                          {
                            columns.map(column => (
                                <td key={ column.key }  className={ Table.td }>
                                  <Link to={`/documents/${row.id}`} className={ Table.a }>
                                    { column.component(row[column.key]) }
                                  </Link>
                                </td>
                            ))
                          }
                        </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async ({ params }) => {
    return await API.Project({ name: params.name });
  },
  path: "/projects/:name",
};

export default Route;
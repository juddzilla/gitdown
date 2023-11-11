import type { ReactElement } from 'react';
import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';
import moment from 'moment';

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
  console.log('data', data);
  return (
      <>
        <div>
          <h1>{ data.project }</h1>
        </div>
        <div className="p-8">
          <table>
            <thead>
              <tr>
                { columns.map((column, index) => (
                    <th key={index} className='capitalize'>{ column.key }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {
                data.results.map((row, index) => {
                  return (
                      <tr key={index} className='h-8'>
                        {
                          columns.map((column, i) => (
                              <td key={i} className='relative'>
                                <Link to={`/documents/${row.id}`} className='absolute top-0 left-0 w-full h-full p-2'>
                                  {column.component(row[column.key])}
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
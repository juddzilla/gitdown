import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

import Table from '../styles/tables';

const request = async (params) => await API.Documents(params);

const emptyValue = (): ReactElement => (
    <span>--</span>
);

const plainText = (value):ReactElement => {
  if (!value || value === 'null') {
    return emptyValue();
  }
  return (
      <span>{ value }</span>
  );
};

const dateField = (date):ReactElement => {
  if (date === 'null' || !date || isNaN(date)) {
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
    display: 'Project',
    key: 'project',
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

const defaultSort = {
  order: 'status',
  direction: 'desc'
};

const doSort = (sortConfig, rows) => rows.sort((a, b) => {
  const { column, direction } = sortConfig;
  let x = a[column];
  let y = b[column];

  if (a[column] && isNaN(a[column])) {
    x = a[column].toLowerCase();
  }

  if (b[column] && isNaN(b[column])) {
    y = b[column].toLowerCase();
  }

  const first = direction === 'desc' ? x : y;
  const second = first === x ? y : x;

  // console.log('first', first);
  // console.log('second', second);

  if (first > second) { return 1; }
  if (first < second) { return -1; }
  return 0;
});

const Componentold = () => {
  const documents = useLoaderData();
  const [data, setData] = useState(doSort(defaultSort, documents));
  const [sort, setSort] = useState(defaultSort);

  useEffect(() => {
    request(sort).then(res => setData(res));
  }, [sort]);

  function chooseSort(order) {
    let direction = 'desc';
    if (sort.order === order) {
      direction = sort.direction === 'desc' ? 'asc' : 'desc';
    }

    setSort({
      order,
      direction,
    });
  }
  return (
      <div className='h-full'>
        <div className='pt-12 pb-32 bg-slate-800 px-8'>
          <div className='mx-auto max-w-5xl w-full'>
            <div className="min-w-0 flex-1 flex items-center mb-4">
              <h1 className="mt-2 text-6xl font-bold text-white ">
                Documents
              </h1>
            </div>
          </div>
        </div>


        <div className='w-full'>
          <div className={ Table.container }>
            <table className={ Table.table }>
              <thead>
              <tr>
                { columns.map((column, index) => {
                  // const classList = ['capitalize'];
                  let sortClassList = ['border-black'];
                  //
                  if (sort.order === column.key) {
                    if (sort.direction === 'asc') {
                      sortClassList.push('border-t-2');
                    } else {
                      sortClassList.push('border-b-2');
                    }
                  }
                  return (
                      <th
                          scope="col"
                          className={ Table.th }
                          key={index}
                          onClick={ chooseSort.bind(null, column.key) }
                      >
                    <span className={ sortClassList.join(' ') }>
                      { column.key }
                    </span>
                      </th>
                  )})}
              </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
              {
                data.map((row, index) => {
                  return (
                      <tr key={index} className={ Table.tbodyTr }>
                        {
                          columns.map((column, i) => (
                              <td key={i} className={ Table.td }>
                                <Link to={`/documents/${row.id}`} className={ Table.a }>
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
        </div>
      </div>
  )
};


function Component() {
  const documents = useLoaderData();
  const [data, setData] = useState(doSort(defaultSort, documents));
  const [sort, setSort] = useState(defaultSort);

  useEffect(() => {
    request(sort).then(res => setData(res));
  }, [sort]);

  function chooseSort(order) {
    let direction = 'desc';
    if (sort.order === order) {
      direction = sort.direction === 'desc' ? 'asc' : 'desc';
    }

    setSort({
      order,
      direction,
    });
  }

  return (
      <div className='h-full'>
        <div className='pt-12 pb-32 bg-slate-800 px-8'>
          <div className='mx-auto max-w-5xl w-full'>
            <div className="min-w-0 flex-1 flex items-center mb-4">
              <h1 className="mt-2 text-6xl font-bold text-white ">
                Documents
              </h1>
            </div>
          </div>
        </div>


        <div className='w-full px-8'>
          <div className="mx-auto max-w-5xl relative bg-white rounded-lg shadow-2xl -top-24">
            <div className="mt-8 flow-root">
              <div className="overflow-x-auto my-2">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className='px-3'>
                      <tr >
                        { columns.map((column, index) => {

                          const arrowClassList = ['ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible'];

                          if (sort.order === column.key) {
                            if (sort.direction === 'asc') {
                              arrowClassList.push('rotate-180')
                            }
                          } else {
                            arrowClassList.push('invisible');
                          }
                          return (
                              <th key={index} scope="col" className="py-3.5 px-4 text-left text-sm font-semibold text-gray-900">
                              <span className="group inline-flex capitalize" onClick={ chooseSort.bind(null, column.key) }>
                                { column.key }
                                <span className={ arrowClassList.join(' ') }>
                                  <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              </span>
                              </th>
                          )
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                    {
                      data.map((row, index) => {
                        return (
                            <tr key={index} className='even:bg-white odd:bg-gray-100'>
                              {
                                columns.map((column, i) => {
                                  const tdClassList = ['whitespace-nowrap px-4 py-4 text-sm text-gray-500'];
                                  if (['priority'].includes(column.key)) {
                                    tdClassList.push('pl-9');
                                  }
                                  return (
                                      <td key={i} className={ tdClassList.join(' ') }>
                                        <Link to={`/documents/${row.id}`} className="">
                                          <span className='text-inherit'>{column.component(row[column.key])}</span>
                                        </Link>
                                      </td>
                                  )
                                })
                              }
                            </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

const Route = {
  element: <Component />,
  loader: async () => {
    return await request(defaultSort);
  },
  path: "/documents",
};

export default Route;
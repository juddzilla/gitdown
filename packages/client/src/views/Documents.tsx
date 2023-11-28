import API from '../interfaces/host';
import { Link, useLoaderData } from 'react-router-dom';
import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';

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

const Component = () => {
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
      <>
        <div>
          <h1>Documents</h1>
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
      </>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    return await request(defaultSort);
  },
  path: "/documents",
};

export default Route;
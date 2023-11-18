import type { ReactElement } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  if (date === 'null' || !date) {
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
  column: 'status',
  direction: 'desc'
};

export default (tableInfo):ReactElement => {
  const doSort = (sortConfig, rows) => rows.sort((a, b) => {
    const { column, direction } = sortConfig;
    const x = a[column].toLowerCase();
    const y = b[column].toLowerCase();

    const first = direction === 'desc' ? x : y;
    const second = first === x ? y : x;

    if (first > second) { return 1; }
    if (first < second) { return -1; }
    return 0;
  });

  const [data, setData] = useState(doSort(defaultSort, tableInfo));
  const [sort, setSort] = useState(defaultSort);

  function chooseSort(column) {
    let direction = 'desc';
    if (sort.column === column) {
      direction = sort.direction === 'desc' ? 'asc' : 'desc';
    }

    const newSort = {
      column,
      direction,
    };
    setSort(newSort);
    const newData = doSort(newSort, data);
    setData(newData);
  }

  return (
      <div className="p-8">
        <table>
          <thead>
          <tr>
            { columns.map((column, index) => {
              const classList = ['capitalize'];
              let sortClassList = ['border-black'];

              if (sort.column === column.key) {
                if (sort.direction === 'asc') {
                  sortClassList.push('border-t-4');
                } else {
                  sortClassList.push('border-b-4');
                }
              }
              return (
                <th
                  className={ classList.join(' ') }
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
          <tbody>
          {
            data.map((row, index) => {
              return (
                  <tr key={index} className='h-8'>
                    {
                      columns.map((column, i) => (
                          <td key={i} className=''>
                            <Link to={`/documents/${row.id}`} className='no-underline  top-0 left-0  h-full p-2'>
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
  );
}
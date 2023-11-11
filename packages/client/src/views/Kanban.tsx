import { useEffect, useState  } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import API from '../interfaces/host';
import DocumentsTable from "../components/documents-table";
import Table from './kanban/table';

const initialGroup = 'priority';

const request = async (params) => await API.Kanban(params);

const groups = [
  {
    display: 'Status',
    name: 'status',
  },
  {
    display: 'Priority',
    name: 'priority',
  },
  {
    display: 'Projects',
    name: 'project',
  },
  {
    display: 'Type',
        name: 'type',
  },
  {
    display: 'Tags',
    name: 'tag',
  },
  {
    display: 'Users',
    name: 'user_id',
  }
];

const Component = () => {
  const results = useLoaderData();
  const [data, setData] = useState(results);
  const [filters, setFilters] = useState({});
  const [group, setGroup] = useState(initialGroup);

  async function getData() {
    // console.log(group, { group });
    // return;
    request({ group }).then(res => setData(res));
    // setData(res);
  }

  useEffect(() => {
    request({ group }).then(res => setData(res));
  }, [group])

  async function chooseGroup({ target }) {
    console.log(target.value);
    setGroup(target.value);

  }
  console.log('data', data);
  return (
      <>
        <div>
          <h1>Kanban</h1>
          <div>
            <select value={group} onChange={ chooseGroup }>

              { groups.map((option, index) => (
                  <option value={option.name} key={index}>
                    { option.display }
                  </option>
              ))}
            </select>
          </div>
          <div>
            Table

            { Table(data.results) }
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  loader: () => request({ group: initialGroup }),
  path: "/kanban",
};

export default Route;
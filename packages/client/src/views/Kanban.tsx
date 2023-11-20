import { useEffect, useState  } from 'react';
import { useLoaderData } from 'react-router-dom';
import API from '../interfaces/host';
import Table from './kanban/table';
import Icon from '../components/Icons';
import Filter from './kanban/filter';

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

const initialFilters = {
  statuses: [],
  priorities: [],
  projects: [],
  tags: [],
  types: [],
  users: [],
};

const Component = () => {
  const results = useLoaderData();
  const [data, setData] = useState(results.data.results);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [group, setGroup] = useState(initialGroup);

  async function getData(group) {
    await request({ group }).then(res => setData(res.results));
    setGroup(group);
  }

  async function chooseGroup({ target }) {
    await getData(target.value);
  }

  function setSelected(key, values) {
    setFilters({ ...filters, [key]: values });
  }

  function toggleShowFilters() {
    setShowFilters(!showFilters);
  }

  const filterIcon = Object.values(filters).some(filter => filter.length) ? 'filterActive' : 'filter';

  return (
      <div className='w-fit h-full'>
        <h1>Kanban</h1>
        <div className='flex items-center mb-4 h-12'>
          <div className='flex items-center mr-8'>
            { Icon('columns', 'stroke-black') }
            <select value={group} onChange={ chooseGroup }>
              { groups.map((option, index) => (
                  <option value={option.name} key={index}>
                    { option.display }
                  </option>
              ))}
            </select>
          </div>
          <div className='flex items-center mr-4' onClick={ toggleShowFilters }>
            { Icon(filterIcon, 'stroke-black') }
          </div>
          { showFilters &&
            <>
              {
                <Filter
                    options={results.list.statuses}
                    property='statuses'
                    selected={filters.statuses}
                    setSelected={setSelected.bind(null, 'statuses')}
                    title='Status'
                />
              }
              {
                <Filter
                    options={results.list.priorities}
                    property='priorities'
                    selected={filters.priorities}
                    setSelected={setSelected.bind(null, 'priorities')}
                    title='Priority'
                />
              }
              {
                <Filter
                    options={results.list.projects}
                    property='projects'
                    selected={filters.projects}
                    setSelected={setSelected.bind(null, 'projects')}
                    title='Projects'
                />
              }
              {
                <Filter
                    options={results.list.tags}
                    property='tags'
                    selected={filters.tags}
                    setSelected={setSelected.bind(null, 'tags')}
                    title='Tags'
                />
              }
              {
                <Filter
                    options={results.list.types}
                    property='types'
                    selected={filters.types}
                    setSelected={setSelected.bind(null, 'types')}
                    title='Types'
                />
              }
              {
                <Filter
                    options={results.list.users}
                    property='users'
                    selected={filters.users}
                    setSelected={setSelected.bind(null, 'users')}
                    title='Users'
                />
              }
            </>
          }

        </div>
        <div className=' h-full'>
          { Table(data) }
        </div>
      </div>
  )
};

const Route = {
  element: <Component />,
  loader: async () => {
    const list = await API.Lists();
    const data = await request({ group: initialGroup })
    return { data, list }
  },
  path: "/kanban",
};

export default Route;
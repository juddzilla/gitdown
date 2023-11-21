import { useEffect, useState  } from 'react';
import { useLoaderData } from 'react-router-dom';
import API from '../interfaces/host';
// import Table from './kanban/table';
import Icon from '../components/Icons';
import Filters from './kanban/Filters';
import DndContext from './kanban/dnd/Context';
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

const filterMap = {
  statuses: 'status',
  priorities: 'priority',
  projects: 'project',
  tags: 'tags',
  types: 'type',
  users: 'user_id',
};

const Component = () => {
  const results = useLoaderData();
  const [data, setData] = useState(results.data.results);
  const [filters, setFilters] = useState(initialFilters);
  const [group, setGroup] = useState(initialGroup);

  // async function getData() {
  //   return await request({ group });
  // }

  useEffect(() => {
    request({ group }).then(res => {
      setData(res.results);
    });
  }, [group, setData]);

  useEffect(() => {
    const filterOn = Object.keys(filters).reduce((acc, key) => {
      if (filters[key].length) {
        acc[filterMap[key]] = filters[key];
      }

      return acc;
    }, {});

    if (!Object.keys(filterOn).length) {
      setData(results.data.results);
      return;
    }

    const newData = results.data.results.map(data => {
      const results = data.results.filter(result => {
        const keys = Object.keys(filterOn);
        const hasKey = keys.some(key => {
          if (Array.isArray(result[key])) {
            return result[key].some(r => filterOn[key].includes(r));
          } else {
            return filterOn[key].includes(result[key])
          }
        });
        if (hasKey) {
          return result;
        }
        return false;
      }).filter(Boolean);

      return {
        ...data, results
      };
    });

    setData(newData);
  }, [filters]);

  async function chooseGroup({ target }) {
    console.log('target.value', target.value);
    setGroup(target.value);
  }

  function setSelected(key, values) {
    setFilters({ ...filters, [key]: values });
  }

  function onDrop(d) {
    console.log('ondrop', d, group);
  }

  const filterIcon = Object.values(filters).some(filter => filter.length) ? 'filterActive' : 'filter';
  const groupingOn = Object.keys(filterMap).find(key => filterMap[key] === group);
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
          <div className='flex items-center mr-4' >
            { Icon(filterIcon, 'stroke-black') }
          </div>
          { Filters({ filters, groupingOn, list: results.list, onSelect: setSelected }) }

        </div>
        <div className=' h-full'>
          { DndContext(data, onDrop) }
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
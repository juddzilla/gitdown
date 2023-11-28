import { useEffect, useRef, useState  } from 'react';
import { useLoaderData } from 'react-router-dom';
import API from '../interfaces/host';
import ENV from '../interfaces/environment';
import Icon from '../components/Icons';
import Filters from './kanban/Filters';
import DndContext from './kanban/dnd/Context';
const initialGroup = 'priority';

const { WSHost } = ENV;

const request = async (params) => await API.Kanban(params);
const move = async (params) => await API.KanbanMove(params);

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
    name: 'tags',
  },
  {
    display: 'Users',
    name: 'users',
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
  users: 'users',
};

const Component = () => {
  const results = useLoaderData();
  const [DATA, setDATA] = useState(results.data.results);
  const [data, setData] = useState(results.data.results);

  const [filters, setFilters] = useState(initialFilters);
  const [group, setGroup] = useState(initialGroup);
  const webSocket = useRef(null);

  const applyFilter = (list, f) => {
    const filterOn = Object.keys(f).reduce((acc, key) => {
      if (f[key].length) {
        acc[filterMap[key]] = f[key];
      }

      return acc;
    }, {});

    if (!Object.keys(filterOn).length) {
      return list;
    }

    return list.map(d => {
      const results = d.results.filter(result => {
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
        ...d, results
      };

    });
  };

  useEffect(() => {
    request({ group }).then(res => {
      setDATA(res.results);
      const filtered = applyFilter(res.results, filters);
      setData(filtered);
    });
  }, [group, setData]);

  useEffect(() => {
    const newData = applyFilter(DATA, filters);
    setData(newData);
  }, [filters]);

  useEffect(() => {
    webSocket.current = new WebSocket(`${WSHost}`);

    webSocket.current.onmessage = ({ data }) => {
      const event = JSON.parse(data);

      if (event.type === 'document_update') {
        request({ group }).then(res => {
          setData(res.results);
        });
      }
    };

    return () => webSocket.current.close();
  }, [group]);

  async function chooseGroup({ target }) {
    setGroup(target.value);
  }

  function setSelected(key, values) {
    setFilters({ ...filters, [key]: values });
  }

  async function onDrop(drop) {
    const { from, item, to } = drop;

    const grouping = { [group]: null };

    const dataFromIndex = data.findIndex(column => `${column.name}` === from);
    const dataToIndex = data.findIndex(column => `${column.name}` === to);

    const existingFromItemIndex = data[dataFromIndex].results.findIndex(result => result.id === item.id);
    const existingToItemIndex = data[dataToIndex].results.findIndex(result => result.id === item.id);

    let updatedItem = { ...item };

    if (['tags', 'users'].includes(group)) {
      grouping[group] = item[group];
      const groupFromIndex = grouping[group].indexOf(from);
      const groupToIndex = grouping[group].indexOf(to);

      if (groupToIndex === -1) {
        grouping[group].push(to);
      }
      grouping[group].splice(groupFromIndex, 1);
      updatedItem = { ...updatedItem, ...grouping };

      if (existingToItemIndex > -1) {
        data[dataToIndex].results[existingToItemIndex] = updatedItem;
      } else {
        data[dataToIndex].results.push(updatedItem);
      }
    } else {
      if (existingToItemIndex > -1) {
        return;
      }
      grouping[group] = to;
      updatedItem = { ...updatedItem, ...grouping };
      data[dataToIndex].results.push(updatedItem);

    }
    data[dataFromIndex].results.splice(existingFromItemIndex, 1);
    setData([...data]);
    await move({ id: item.id, metadata: updatedItem });
  }

  const filterIcon = Object.values(filters).some(filter => filter.length) ? 'filterActive' : 'filter';
  const groupingOn = Object.keys(filterMap).find(key => filterMap[key] === group);
  return (
      <div className='h-full'>
        <h1>Kanban</h1>
        <div className='flex items-center mb-4 h-12 mr-2'>
          <div className='flex items-center mr-8 border border-gray-200 rounded-lg px-2'>
            { Icon('columns', 'stroke-black') }
            <select value={group} onChange={ chooseGroup } className="outline-none py-3 px-1 pe-9 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
              { groups.map((option, index) => (
                  <option value={option.name} key={index}>
                    { option.display }
                  </option>
              ))}
            </select>
          </div>
          <div className='flex items-center mr-4' >
            { Filters({ filters, groupingOn, list: results.list, onSelect: setSelected }) }
          </div>

        </div>
        <div className=' h-full'>
          { DndContext(group, data, onDrop) }
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
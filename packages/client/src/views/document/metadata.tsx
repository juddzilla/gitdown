import type { ReactElement } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Metadata {
  archived: boolean,
  due: bigint,
  filepath: string,
  id: string,
  priority: string,
  status: string,
  tags: string[],
  title: string,
  updated: bigint,
  users: string[],
}

const emptyValue = (): ReactElement => (
    <div>--</div>
);

const plainText = (value): ReactElement => {
  if (!value) {
    return emptyValue();
  }
  return (
      <div>
        {value}
      </div>
  );
};

const order = [
  {
    component: (project): ReactElement => {
      if (!project) {
        return emptyValue();
      }
      return (
          <div>
            <Link to={`/projects/${project}`}>
              { project }
            </Link>
          </div>
      );
    },
    key: 'project'
  },
  {
    component: plainText,
    key: 'priority'
  },
  {
    component: plainText,
    key: 'status'
  },
  {
    component: (tags): ReactElement => {
      if (!tags || !tags.length) {
        return emptyValue();
      }
      return (
          <div className='flex flex-wrap'>
            { tags.map((tag, index) => (
              <Link to={`/tags/${tag}`} className='tag mr-2' key={index}>
                { tag }
              </Link>
            )) }
          </div>
      );
    },
    key: 'tags',
  },
  {
    component: (users): ReactElement => {
      if (!users || !users.length) {
        return emptyValue();
      }
      return (
          <div>
            { users.map((user, index) => (
              <div>
                <Link to={`/users/${user}`} className='user mr-2' key={index}>
                  { user }
                </Link>
              </div>
            )) }
          </div>
      );
    },
    key: 'users',
  },
  {
    component: (date): ReactElement => (
        <>
          { moment(date).format('MMMM Do, YYYY') }
        </>
    ),
    display: 'Last Updated',
    key: 'updated',
  },
];
export default (metadata: Metadata): ReactElement => {
  return (
      <div className="bg-slate-100 pt-10 w-72">
        { order.map((item, index) => {
          return (
            <div key={index} className={`px-4 mb-6`}>
              <div className='text-xs capitalize font-bold'>
                { Object.hasOwn(item, 'display') ? (
                    <span>{ item.display }</span>
                ) : (
                    <span>{ item.key }</span>
                ) }
              </div>
              { item.component(metadata[item.key]) }
            </div>
          );
        })}
      </div>
  );
}

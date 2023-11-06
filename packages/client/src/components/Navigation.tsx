import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icons from './Icons';

const links = [
  { display: 'GitDown', icon: 'logo', path: '/' },
  { display: 'Kanban', icon: 'kanban', path: '/kanban' },
  { display: 'Documents', icon: 'document', path: '/documents' },
  { display: 'Projects', icon: 'folder', path: '/projects' },
  { display: 'Tags', icon: 'tag', path: '/tags' },
  { display: 'Users', icon: 'users', path: '/users' },
];

export default () => {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);

  useEffect(() => {
    setCurrent(location.pathname);
  }, [location]);

  return (
      <nav className="w-72 pl-6 pr-6 pb-6 bg-slate-500 flex flex-col justify-between h-screen">
        <div className='mt-10'>
          { links.map((link, index) => {
            const containerClassList = ['my-4'];
            if (link.path === '/') {
              containerClassList.push('pb-8');
            }
            const linkClassList = ['flex', 'items-center', 'rounded'];
            if (current === link.path || (link.path !== '/' && current.includes(link.path))) {
              linkClassList.push('bg-slate-900');
            } else {
              linkClassList.push('hover:bg-slate-700');
            }
            return (
              <div key={`header-${index}`} className={ containerClassList.join(' ')}>
                <Link to={link.path} className={linkClassList.join(' ')}>
                  <div className='mr-3 p-2'>
                    { Icons(link.icon, 'stroke-slate-50') }
                  </div>
                  <span className='text-slate-50 text-sm font-medium'>
                    { link.display }
                  </span>
                </Link>
              </div>
            ); }) }
        </div>
        <div>User</div>
      </nav>
  )
};

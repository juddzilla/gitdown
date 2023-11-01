import { Link, useLocation } from 'react-router-dom';

const links = [
  { display: 'Home', path: '/' },
  { display: 'Documents', path: '/documents' },
  { display: 'Projects', path: '/projects' },
];

export default () => {
  return (
      <header>
        <div>
          { links.map((link, index) => (
              <div key={`header-${index}`}>
                <Link to={link.path}>
                  { link.display }
                </Link>
              </div>
            )) }
        </div>
      </header>
  )
};

// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import Icons from './Icons';
//
// import API from '../interfaces/host';
//
// const links = [
//   { display: 'GitDown', icon: 'logo', path: '/' },
//   { display: 'Kanban', icon: 'kanban', path: '/kanban' },
//   { display: 'Projects', icon: 'folder', path: '/projects' },
//   { display: 'Documents', icon: 'document', path: '/documents' },
// ];
//
// export default () => {
//   const location = useLocation();
//   const [current, setCurrent] = useState(location.pathname);
//   const [user, setUser] = useState('');
//
//   useEffect(() => {
//     setCurrent(location.pathname);
//   }, [location]);
//
//   useEffect(() => {
//     API.User().then(res => {
//       setUser(res.name);
//     });
//   }, []);
//
//
//   return (
//       <nav className="min-h-screen pl-6 pr-6 pb-6 flex flex-col items-end">
//         <div className='flex flex-col justify-between mt-10'>
//           <div>
//
//             { links.map((link, index) => {
//               const containerClassList = ['my-4', 'w-60'];
//               if (link.path === '/') {
//                 containerClassList.push('pb-8');
//               }
//               const linkClassList = ['flex', 'items-center', 'rounded'];
//               if (current === link.path || (link.path !== '/' && current.includes(link.path))) {
//                 linkClassList.push('bg-slate-900');
//               } else {
//                 linkClassList.push('hover:bg-slate-700');
//               }
//               return (
//                 <div key={`header-${index}`} className={ containerClassList.join(' ')}>
//                   <Link to={link.path} className={linkClassList.join(' ')}>
//                     <div className='mr-3 p-2'>
//                       { Icons(link.icon, 'stroke-slate-50') }
//                     </div>
//                     <span className='text-slate-50 text-sm font-medium'>
//                       { link.display }
//                     </span>
//                   </Link>
//                 </div>
//               ); }) }
//           </div>
//           <div>{ user }</div>
//         </div>
//       </nav>
//   )
// };

import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useLocation } from 'react-router-dom';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const links = [
  { display: 'Kanban', icon: 'kanban', path: '/kanban' },
  { display: 'Projects', icon: 'folder', path: '/projects' },
  { display: 'Documents', icon: 'document', path: '/documents' },
];
export default function Navigation() {

  return (
      <Disclosure as="nav" className="bg-slate-800 px-8">
        {({ open }) => (
            <>
              <div className="mx-auto max-w-5xl">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 200 200"><path fill="url(#paint0_linear_104_26)" fillRule="evenodd" d="M107.143 0H92.857v82.756L34.34 24.239 24.24 34.34l58.517 58.517H0v14.286h82.755L24.24 165.66l10.101 10.101 58.517-58.517V200h14.286v-82.756l58.517 58.517 10.101-10.101-58.517-58.517H200V92.857h-82.756l58.517-58.517-10.101-10.102-58.517 58.517V0Z" clipRule="evenodd"></path><defs><linearGradient id="paint0_linear_104_26" x1="20.5" x2="100" y1="16" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="#ACAAFF"></stop><stop offset="1" stopColor="#C0E8FF"></stop></linearGradient></defs></svg>
                    </div>
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex space-x-4">
                        {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                        { links.map(link => {
                          return (
                              <Link
                                  className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                                  key={ link.display }
                                  to={ link.path }>
                                { link.display }
                              </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex items-center">
                      <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                  <a
                                      href="#"
                                      className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                  >
                                    Your Profile
                                  </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                  <a
                                      href="#"
                                      className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                  >
                                    Settings
                                  </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                  <a
                                      href="#"
                                      className={classNames(
                                          active ? 'bg-gray-100' : '',
                                          'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                  >
                                    Sign out
                                  </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex sm:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="sm:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  >
                    Dashboard
                  </Disclosure.Button>
                  <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Team
                  </Disclosure.Button>
                  <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Projects
                  </Disclosure.Button>
                  <Disclosure.Button
                      as="a"
                      href="#"
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Calendar
                  </Disclosure.Button>
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                          className="h-10 w-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">Tom Cook</div>
                      <div className="text-sm font-medium text-gray-400">tom@example.com</div>
                    </div>
                    <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                        as="a"
                        href="#"
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
        )}
      </Disclosure>
  )
}

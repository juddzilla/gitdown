import { Fragment, useState } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

import Metadata from './Metadata';
import WYSIWYG from './editor';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Document({ onSave }) {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [metadata, setMetadata] = useState(data.metadata);
  const [content, setContent] = useState(data.html);
  const [canSave, setCanSave] = useState(false)

  const save = async () => {
    try {
      const response = await onSave({
        id: metadata.id,
        content,
        metadata
      });

      if (Object.hasOwn(response, 'created')) {
        navigate(`/documents/${response.created}`);
      }
      setCanSave(false);
    } catch (err) {
      console.log('SAVE RR', err);
      setCanSave(false);
    }
  };

  function updateMetadata(metadata) {
    setMetadata(metadata);
    const canSave = metadata.title && metadata.title.trim().length && metadata.status && metadata.status.trim().length;
    setCanSave(canSave);
  }

  function titleChange({ target }) {
    updateMetadata({ ...metadata, title: target.value });
  }

  function updateContent(html) {
    setCanSave(true);
    setContent(html);
  }
  return (
      <>
        <div className={`lg:flex lg:items-center lg:justify-between pt-12 pb-32 bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary`}>
          <div className='mx-auto max-w-5xl w-full flex'>
            <div className="min-w-0 flex-1">
              <nav className="flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-4">
                  <li>
                    <div className="flex">
                      <Link to='/projects' className="text-sm font-medium text-black hover:text-white">
                        Projects
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center">
                      <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-black" aria-hidden="true" />
                      <Link to={`/projects/${metadata.project}`} className="ml-4 text-sm font-medium text-black hover:text-white">
                        { metadata.project }
                      </Link>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className="mt-2 text-5xl font-bold text-white">
                { metadata.type }: { metadata.title }
              </h1>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="sm:ml-3">
                <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-blue-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                  Publish
                </button>
              </span>

              {/* Dropdown */}
              <Menu as="div" className="relative ml-3 sm:hidden">
                <Menu.Button className="inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                  More
                  <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5" aria-hidden="true" />
                </Menu.Button>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 z-10 -ml-1 mt-2 w-48 origin-top-left rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                          <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Edit
                          </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                          <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            View
                          </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <div className='mx-auto max-w-5xl flex -mt-24 justify-between'>
          <div className=''>
            <div className='min-h-screen px-6 bg-white rounded shadow-2xl flex justify-center'>
              <div className='max-w-prose min-h-screen'>
                <WYSIWYG content={ content } update={ updateContent }/>
              </div>
            </div>
          </div>

          <div className='ml-14 pt-32'>
            <Metadata
              list={ data.list }
              metadata={ metadata }
              update={ updateMetadata }
            />
          </div>
        </div>
      </>
  )
}

// import { useState } from 'react';
// import type { ReactElement } from 'react';
// import { useLoaderData, useNavigate } from 'react-router-dom';
//
// import Metadata from './Metadata';
// import WYSIWYG from './editor';
//
// const Component = ({ onSave }): ReactElement => {
//   const data = useLoaderData();
//   const navigate = useNavigate();
//
//   const [metadata, setMetadata] = useState(data.metadata);
//   const [content, setContent] = useState(data.html);
//   const [canSave, setCanSave] = useState(false)
//
//   const save = async () => {
//     try {
//       const response = await onSave({
//         id: metadata.id,
//         content,
//         metadata
//       });
//
//       if (Object.hasOwn(response, 'created')) {
//         navigate(`/documents/${response.created}`);
//       }
//       setCanSave(false);
//     } catch (err) {
//       console.log('SAVE RR', err);
//       setCanSave(false);
//     }
//   };
//
//   function updateMetadata(metadata) {
//     setMetadata(metadata);
//     const canSave = metadata.title && metadata.title.trim().length && metadata.status && metadata.status.trim().length;
//     setCanSave(canSave);
//   }
//
//   function titleChange({ target }) {
//     updateMetadata({ ...metadata, title: target.value });
//   }
//
//   function updateContent(html) {
//     setCanSave(true);
//     setContent(html);
//   }
//
//   return (
//       <div className='ml-4'>
//         <div className='flex mb-3'>
//           <div className='flex items-center  w-full max-w-prose'>
//             <div className={`flex rounded h-14 w-14 mr-2 justify-center items-center text-white bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary font-bold text-xl capitalize`}>
//               { metadata.type[0] }
//             </div>
//             <div className='w-full'>
//               <div className='w-full text-md'>{ metadata.project }</div>
//               <input
//                   className='border-b-2 border-solid border-slate-800 outline-none text-4xl bg-transparent w-full font-extrabold'
//                   onChange={ titleChange }
//                   placeholder='Title'
//                   type="text"
//                   value={metadata.title}
//               />
//             </div>
//           </div>
//         </div>
//         <div className='flex'>
//           <div className="max-w-prose w-full">
//             <WYSIWYG content={ content } update={ updateContent }/>
//           </div>
//
//           <div className='ml-8'>
//             <Metadata
//                 list={ data.list }
//                 metadata={ metadata }
//                 update={ updateMetadata }
//             />
//             <div className='w-64 flex items-center'>
//               <button
//                   className={`
//                 rounded-md uppercase text-white
//                 disabled:text-stone-400 disabled:bg-slate-50 disabled:border-slate-100 disabled:shadow-none
//                 bg-${metadata.type.replace(' ', '-').toLowerCase()}-primary border-${metadata.type.replace(' ', '-').toLowerCase()}-secondary disabled:shadow-none
//                 h-12 w-full`}
//                   disabled={ !canSave }
//                   onClick={ save }
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// };
// export default Component;


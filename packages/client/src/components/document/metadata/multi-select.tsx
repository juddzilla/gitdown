import { Fragment, useState } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Combobox, Dialog, Transition } from '@headlessui/react';

import styles from './styles';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function MultiSelect(props) {
  const {
    allowCreate,
    display,
    options,
    property,
    selected,
    setSelected,
    title,
  } = props;
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(options);

  function reset() {
    setQuery('');
    setData([...data]);
  }

  function handleInput(value) {
    setQuery(value);
    if (value === '') {
      setData(options);
      return;
    }

    const refined = options.filter(d => {
      return String(d).toLowerCase().includes(value.toLowerCase());
    });
    setData(refined);
  }

  function createSelection(choice) {
    const choices = [...selected];
    const index = choices.indexOf(choice);

    if (index === -1) {
      choices.push(choice);
    } else {
      choices.splice(index, 1);
    }
    setSelected({ [property]: choices });
  }

  function handleSelection(choice) {
    createSelection(choice);
    reset();
  }

  function createNew() {
    const newOpts = [...options, query].sort();
    setData(newOpts);
    createSelection(query);
    setOpen(false);
  }


  return (
      <div className={ ['mb-4', styles.container].join(' ') }>
        <div className={ styles.heading }>
          { title }
        </div>
        <div className='flex flex-wrap flex-1'>
          <span className='mr-2 mb-2 inline-flex items-center border border-grey-100 gap-x-0.5 rounded-md bg-white hover:bg-white hover:border-black hover:text-black px-1 py-1 '>
            <PlusCircleIcon className="w-6 text-gray-400 hover:text-inherit cursor-pointer" aria-hidden="true"  onClick={ setOpen.bind(null, true) } />
          </span>
          { selected.map(item => (
              <span key={ item } className="mr-2 mb-2 inline-flex items-center border border-grey-100 gap-x-0.5 rounded-md bg-gray-100 hover:bg-white hover:border-black px-2 py-1 text-sm font-medium text-gray-600">
                { item }
                <button onClick={ handleSelection.bind(null, item) } type="button" className="group relative -mr-1 h-3.5 w-3.5 rounded-sm hover:bg-gray-500/20">
                  <span className="sr-only">Remove</span>
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 stroke-gray-700/50 group-hover:stroke-black">
                    <path d="M4 4l6 6m0-6l-6 6" />
                  </svg>
                  <span className="absolute -inset-1" />
                </button>
              </span>
          ))}
        </div>
        <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery('')} appear={ false }>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                  <Combobox onChange={(item) => handleSelection(item)}>
                    <Combobox.Input
                        className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
                        placeholder="Search..."
                        onChange={(event) => handleInput(event.target.value)}
                    />

                    { data.length > 0 && (
                        <Combobox.Options
                            static
                            className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                        >
                          { data.map((d) => {
                            if (selected.includes(d)) {
                              return null;
                            }

                            return (
                                <Combobox.Option
                                    key={ d }
                                    value={ d }
                                    className={({ active }) =>
                                        classNames(
                                            'cursor-default select-none rounded-md px-4 py-2',
                                            active && 'bg-indigo-600 text-white'
                                        )
                                    }
                                >
                                  { d }
                                </Combobox.Option>
                            )

                          })}
                        </Combobox.Options>
                    )}

                    {query !== '' && data.length === 0 && (
                        <div className="px-4 py-14 text-center sm:px-14">
                          <p className="mb-6 text-sm text-gray-900">No { title } found for "{ query }" </p>
                          { allowCreate &&
                              <button
                                  onClick={ createNew }
                                  type="button"
                                  className="rounded bg-indigo-600 px-2 py-1 text-lg  font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Create { query }
                              </button>
                          }
                        </div>
                    )}
                  </Combobox>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
  )
}
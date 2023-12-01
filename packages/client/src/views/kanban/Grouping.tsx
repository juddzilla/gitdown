import { Fragment } from 'react';
import {Combobox, Listbox, Transition} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ViewColumnsIcon } from "@heroicons/react/24/outline";
const initialGroup = 'priority';

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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default ({ selected, choose }) => {
  return (
      <Listbox value={ selected } onChange={ choose }>
        {({ open }) => (
            <>
              <div className="relative mr-16">
                <div className="block text-sm font-medium leading-6 text-gray-900 capitalize mb-2 text-white ">Columns</div>
                <Listbox.Button className="relative w-full flex items-center cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  {/*<ViewColumnsIcon className="h-12 w-12 mr-2 text-gray-400"  />*/}
                  <span className="block truncate capitalize mr-2">{ selected }</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
                </Listbox.Button>

                <Transition
                    show={ open }
                    as={ Fragment }
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    { groups.map((group) => (
                        <Listbox.Option
                            key={ group.name }
                            className={({ active }) =>
                                classNames(
                                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                            }
                            value={ group.name }
                        >
                          {({ selected, active }) => (
                              <>
                        <span className={ classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate') }>
                          { group.display }
                        </span>

                                {selected ? (
                                    <span
                                        className={classNames(
                                            active ? 'text-white' : 'text-indigo-600',
                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                        )}
                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                ) : null}
                              </>
                          )}
                        </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
        )}
      </Listbox>
  );
}
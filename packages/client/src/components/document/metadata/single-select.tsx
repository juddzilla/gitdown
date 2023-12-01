import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Combobox } from '@headlessui/react';

import styles from './styles';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SingleSelect(props) {
  const {
    options,
    property,
    selected,
    setSelected,
    title,
  } = props;

  const [data, setData] = useState(options);

  function reset() {
    setData([...data]);
  }

  function handleInput(value) {
    if (value === '') {
      setData(options);
      return;
    }

    const refined = options.filter(d => {
      return String(d).toLowerCase().includes(value.toLowerCase());
    });
    setData(refined);
  }

  function handleSelection(choice) {
    if (choice === selected) {
      return;
    }
    setSelected({ [property]: choice });
    reset();
  }

  return (
      <Combobox as="div" value={ selected } onChange={ handleSelection } className={ ['mb-6', styles.container].join(' ') }>
        <Combobox.Label className={ styles.heading }>{ title }</Combobox.Label>
        <div className="relative">
          <Combobox.Input
              className="w-full rounded-md border-0 bg-white py-1.5 pr-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(event) => handleInput(event.target.value)}
              displayValue={ (selected) => selected }
          />
          <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-2 focus:outline-none">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400 hover:text-black" aria-hidden="true" />
          </Combobox.Button>

          {data.length > 0 && (
              <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((d) => (
                    <Combobox.Option
                        key={ d }
                        value={ d }
                        className={({ active }) =>
                            classNames(
                                'relative cursor-default select-none py-2 pl-3 pr-9',
                                active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                            )
                        }
                    >
                      {({ active, selected }) => (
                          <>
                            <span className={classNames('block truncate', selected && 'font-semibold')}>{ d }</span>

                            {selected && (
                                <span
                                    className={classNames(
                                        'absolute inset-y-0 right-0 flex items-center pr-4',
                                        active ? 'text-white' : 'text-indigo-600'
                                    )}
                                >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                            )}
                          </>
                      )}
                    </Combobox.Option>
                ))}
              </Combobox.Options>
          )}
        </div>
      </Combobox>
  )
}
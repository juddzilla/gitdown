 import { Fragment, useState } from 'react'
  import { Listbox, Transition } from '@headlessui/react'
  import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  export default function Example(data) {
    const {
      options,
      selected,
      setSelected,
      title,
    } = data;

    function createSelection(choice) {
      const choices = [...selected];
      const index = choices.indexOf(choice);

      if (index === -1) {
        choices.push(choice);
      } else {
        choices.splice(index, 1);
      }
      setSelected(choices);
    }

    let display = '--';

    if (selected.length) {
      display = selected[0];

      if (selected.length > 1) {
        display += ` + ${selected.length - 1}`;
      }
    }

    return (
        <div  className='mr-4'>
          <Listbox value={ selected } onChange={ createSelection }>
            {({ open }) => (
                <>
                  <Listbox.Label className="text-white block text-sm font-medium leading-6 text-gray-900 capitalize">{ title }</Listbox.Label>
                  <div className="relative mt-2 w-40">
                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <span className="block">{ display }</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
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
                        { options.map((option) => {
                          const classList = ['relative cursor-default select-none py-2 pl-3 pr-9'];

                          const isSelected = selected.includes(option);

                          if (isSelected) {
                            classList.push('bg-indigo-600 text-white');
                          } else {
                            classList.push('text-gray-900');
                          }

                          return (
                              <Listbox.Option
                                  className={ classList.join(' ') }
                                  key={ option }
                                  value={ option }
                              >
                                {({ selected, active }) => (
                                    <>
                                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block')}>
                                        { option }
                                      </span>
                                      { isSelected &&
                                          <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-white' >
                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                          </span>
                                      }
                                    </>
                                )}
                              </Listbox.Option>
                          )
                        })}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
            )}
          </Listbox>
        </div>
    )
  }


// import { useEffect, useState } from 'react';
// import Dropdown from './dropdown';
//
// const Option = (data) => {
//   const {
//     index,
//     onClick,
//     option,
//     selected,
//   } = data;
//   // console.log('filte data', data);
//
//   const classList = [
//     'cursor-pointer',
//     'flex',
//     'h-10',
//     'hover:font-bold',
//     'items-center',
//     'pl-2',
//     'w-full',
//     'z-10000',
//   ];
//
//   if (selected) {
//     classList.push('font-bold')
//   }
//   return (
//       <div
//           className={ classList.join(' ') }
//           key={ index }
//       >
//         <label className='w-full h-full flex items-center'>
//           <input
//               className='mr-2'
//               defaultChecked={selected}
//               onChange={ onClick }
//               type='checkbox'
//               value={option}
//           />
//           <span className='capitalize mr-1'>{ option }</span>
//         </label>
//       </div>
//   );
// }
//
// export default ({ options, selected, setSelected, title  }) => {
//   const id = `filter-${title}`;
//
//   const [data, setData] = useState(options);
//   const [search, setSearch] = useState('');
//   const [show, setShow] = useState(false);
//
//   useEffect(() => {
//     setData(options);
//   }, [options]);
//
//   useEffect(() => {
//     const handleClick=({ target })=>{
//       if (show) {
//         const container = document.getElementById(id);
//         if (!container.contains(target)) {
//           setShow(false);
//         }
//       }
//     };
//
//     window.addEventListener('click', handleClick);
//
//     return () => window.removeEventListener('click', handleClick);
//   }, [show, setShow, id]);
//
//   function createSelection(choice) {
//     const choices = [...selected];
//     const index = choices.indexOf(choice);
//
//     if (index === -1) {
//       choices.push(choice);
//     } else {
//       choices.splice(index, 1);
//     }
//     setSelected(choices);
//   }
//
//   function reset() {
//     setSearch('');
//     setData([...data]);
//   }
//
//   function handleInput({ target }) {
//     setSearch(target.value);
//
//     const refined = options.filter(d => {
//       return d.toLowerCase().includes(target.value.toLowerCase());
//     });
//     setData(refined);
//   }
//
//   function handleSelection(choice) {
//     createSelection(choice);
//     reset();
//   }
//
//   function toggleShow() {
//     setShow(!show);
//   }
//
//   const caretClassList = ['w-4', 'h-4'];
//
//   if (show) {
//     caretClassList.push('rotate-180');
//   }
//
//   return (
//       <div className={ Dropdown.container } id={ id }>
//         <button
//           className={ Dropdown.actionButton }
//           id={ `${title}-dropdown` }
//           onClick={ toggleShow }
//           type="button"
//         >
//           { !!selected.length &&
//               <span className='inline-block w-7 h-5 bg-black text-white flex justify-center items-center rounded-full'>{ selected.length }</span>
//           }
//           { title }
//           <svg className={ caretClassList.join(' ') } xmlns="http://www.w3.org/2000/svg"
//                width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
//                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="m6 9 6 6 6-6"/>
//           </svg>
//         </button>
//         { show &&
//           <div className={ Dropdown.menu }>
//             <div className={ Dropdown.inputContainer }>
//               <input
//                   className={ Dropdown.input }
//                   onChange={ handleInput }
//                   placeholder='Search'
//                   value={ search }
//               />
//             </div>
//             <div className={ Dropdown.menuItemContainer }>
//               {
//                 data.map((option, index) => {
//                   const isSelected = selected.includes(option);
//                   const d = {
//                     index,
//                     onClick: handleSelection.bind(null, option),
//                     option,
//                     selected: isSelected,
//                   };
//
//                   return (
//                       <span key={ index } className={ Dropdown.menuItem }>
//                         { Option(d) }
//                       </span>
//                   );
//                 })
//               }
//             </div>
//           </div>
//         }
//
//       </div>
//   );
// }
import { useEffect, useState } from 'react';
import Dropdown from './dropdown';

const Option = (data) => {
  const {
    index,
    onClick,
    option,
    selected,
  } = data;
  // console.log('filte data', data);

  const classList = [
    'cursor-pointer',
    'flex',
    'h-10',
    'hover:font-bold',
    'items-center',
    'pl-2',
    'w-full',
    'z-10000',
  ];

  if (selected) {
    classList.push('font-bold')
  }
  return (
      <div
          className={ classList.join(' ') }
          key={ index }
      >
        <label className='w-full h-full flex items-center'>
          <input
              className='mr-2'
              defaultChecked={selected}
              onChange={ onClick }
              type='checkbox'
              value={option}
          />
          <span className='capitalize mr-1'>{ option }</span>
        </label>
      </div>
  );
}

export default ({ options, selected, setSelected, title  }) => {
  const id = `filter-${title}`;

  const [data, setData] = useState(options);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    setData(options);
  }, [options]);

  useEffect(() => {
    const handleClick=({ target })=>{
      if (show) {
        const container = document.getElementById(id);
        if (!container.contains(target)) {
          setShow(false);
        }
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
  }, [show, setShow, id]);

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

  function reset() {
    setSearch('');
    setData([...data]);
  }

  function handleInput({ target }) {
    setSearch(target.value);

    const refined = options.filter(d => {
      return d.toLowerCase().includes(target.value.toLowerCase());
    });
    setData(refined);
  }

  function handleSelection(choice) {
    createSelection(choice);
    reset();
  }

  function toggleShow() {
    setShow(!show);
  }

  const caretClassList = ['w-4', 'h-4'];

  if (show) {
    caretClassList.push('rotate-180');
  }

  return (
      <div className={ Dropdown.container } id={ id }>
        <button
          className={ Dropdown.actionButton }
          id={ `${title}-dropdown` }
          onClick={ toggleShow }
          type="button"
        >
          { !!selected.length &&
              <span className='inline-block w-7 h-5 bg-black text-white flex justify-center items-center rounded-full'>{ selected.length }</span>
          }
          { title }
          <svg className={ caretClassList.join(' ') } xmlns="http://www.w3.org/2000/svg"
               width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </button>
        { show &&
          <div className={ Dropdown.menu }>
            <div className={ Dropdown.inputContainer }>
              <input
                  className={ Dropdown.input }
                  onChange={ handleInput }
                  placeholder='Search'
                  value={ search }
              />
            </div>
            <div className={ Dropdown.menuItemContainer }>
              {
                data.map((option, index) => {
                  const isSelected = selected.includes(option);
                  const d = {
                    index,
                    onClick: handleSelection.bind(null, option),
                    option,
                    selected: isSelected,
                  };

                  return (
                      <span key={ index } className={ Dropdown.menuItem }>
                        { Option(d) }
                      </span>
                  );
                })
              }
            </div>
          </div>
        }

      </div>
  );
}
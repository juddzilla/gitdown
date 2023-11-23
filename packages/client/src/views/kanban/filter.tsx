import { useEffect, useState } from 'react';

const Option = (data) => {
  const {
    index,
    onClick,
    option,
    selected,
  } = data;
  console.log('filte data', data);

  const classList = [
    'cursor-pointer',
    'even:bg-slate-50',
    'flex',
    'h-10',
    'hover:bg-slate-300',
    'hover:font-bold',
    'items-center',
    'odd:bg-slate-200',
    'px-2'
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

  console.log('options', id, options);

  const [data, setData] = useState(options);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);

  useEffect(()=>{
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

  return (
      <div className='relative mr-4' id={ id }>
        <div className='flex hover:text-black text-slate-400' onClick={ toggleShow }>
          <span className='capitalize'>{ title }</span>
          { !!selected.length &&
            <span className='ml-1 inline-block w-7 h-7 bg-black text-white flex justify-center items-center rounded-full'>{ selected.length }</span>
          }
        </div>
        {
          show &&
          <div className='absolute border top-8 z-10 border-b-0 border-black left-0 h-12 w-48'>
            <div className=''>
              <input
                  className='outline-none p-2 w-full'
                  onChange={ handleInput }
                  placeholder='Search'
                  value={ search }
              />
            </div>
            <div className='overflow-scroll w-48 border border-t-0 border-black max-h-64 relative -left-px w-full shadow-xl'>
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
                      <span key={ index }>
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
  // return (<div>Filter</div>);
}
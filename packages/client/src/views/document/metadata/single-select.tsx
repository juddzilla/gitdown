import { useEffect, useState } from 'react';

export default (config) => {
  const {
    options,
    property,
    selected,
    setSelected,
    title,
  } = config;

  const [active, setActive] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setData(options);
  }, [options]);

  function reset() {
    setSearch('');
    setData(options);
  }

  function handleInput({ target }) {
    setSearch(target.value);

    if (target.value === '') {
      setData(options);
      return;
    }

    const refined = options.filter(d => {
      return d.toLowerCase().includes(target.value.toLowerCase());
    });
    setData(refined);
  }

  function handleSelection(choice) {
    const selection = choice === selected ? '' : choice;
    setSelected({ [property]: selection });
    reset();
    setActive(false);
  }

  function toggleActive() {
    setActive(!active);
    setSearch('');
    setData(options);
  }

  return (
      <>
        <div className='mb-2 flex items-center justify-between'>
          <span className='text-xs font-bold uppercase'>
            { title }
          </span>
          <div onClick={ toggleActive }>
            <span>\</span>
            <span>/</span>
          </div>
        </div>
        { !active ? (
          (selected.length) ? (
              <>
                <span className='rounded bg-white p-2'>
                  { selected}
                </span>
                <span onClick={handleSelection.bind(null, '')}>X</span>
              </>
            ) : (
              <span className='p-2'>
                No Selection
              </span>
            )
        ) : (
          <div>
            <input
            className='p-2 w-full'
            onChange={ handleInput }
            placeholder='Search'
            value={ search }
            />
            <div className='p-2 h-64 w-full'>
              {
                data.map((option, index) => {
                  const classList = ['cursor-pointer', 'hover:font-bold'];

                  if (selected === option) {
                    classList.push('font-bold')
                  }
                  return (
                      <div
                          className={ classList.join(' ') }
                          key={index}
                          onClick={handleSelection.bind(null, option)}
                      >
                        { option }
                      </div>
                  )
                })
              }
            </div>
          </div>
          ) }
      </>
  )
}
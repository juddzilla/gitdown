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
    const choices = [...selected];
    const index = choices.indexOf(choice);

    if (index === -1) {
      choices.push(choice);
    } else {
      setSelected({ [property]: choices });
      choices.splice(index, 1);
    }
    setSelected({ [property]: choices });
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
                <div className='flex flex-wrap'>
                  {
                    selected.map((s,i) => (
                        <div className='mb-4 mr-2'>
                          <span className='rounded bg-white p-2' key={i}>
                            { s }
                          </span>
                          <span onClick={handleSelection.bind(null, s)}>X</span>
                        </div>
                    ))
                  }
                </div>
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

                    if (selected.includes(option)) {
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
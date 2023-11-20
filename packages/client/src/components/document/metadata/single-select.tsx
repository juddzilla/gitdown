import { useState } from 'react';
import SelectOption from './select-option';
import Heading from './Heading';
import Icons from '../../Icons';
import Section from './Section';

export default (props) => {
  const {
    display,
    options,
    property,
    selected,
    setSelected,
    title,
  } = props;

  const [active, setActive] = useState(false);
  const [data, setData] = useState(options);
  const [search, setSearch] = useState('');

  function reset() {
    setActive(false);
    setSearch('');
    setData([...data]);
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
    if (choice === selected) {
      setActive(false);
      return;
    }
    setSelected({ [property]: choice });
    reset();
  }


  return (
      <Section>
        { Heading({
          active: true,
          noToggle: true,
          title,
          toggleActive: null,
        }) }
        { !active ? (
            <div className='flex flex-wrap relative' onClick={ () => setActive(true) }>
              {  (selected && selected.length) ? (
                  <div className='flex items-center rounded cursor-pointer w-full p-2'>
                    <span className='px-1 pr-0 w-full bg-white'>
                      { selected }
                    </span>
                  </div>
              ) : (
                  <span>
                  No Selection
                </span>
              ) }
              <span className='absolute cursor-pointer h-9 bg-white flex items-center right-0'>
                { Icons('arrowDown', ['stroke-black', 'scale-50']) }
              </span>
            </div>
        ) : (
            <div>
              <div className='border-b-4 border-black relative'>
                <input
                    className='outline-none p-2 w-full'
                    onChange={ handleInput }
                    placeholder='Search'
                    value={ search }
                />
                <span
                    className='absolute h-11 bg-white flex items-center right-0 top-0 z-1 cursor-pointer'
                    onClick={ () => setActive(false) }
                >
                  { Icons('x', ['stroke-black', 'scale-50']) }
                </span>
              </div>
              { !!!data.length &&
                <div
                    className='p-2 font-bold bg-black text-white'
                >
                  No { display }: "{ search }"
                </div>
              }
              <div className='overflow-scroll max-h-64 w-full border-b-2 border-white'>
                {
                  data.map((option, index) => {
                    const isSelected = selected === option;
                    const d = {
                      index,
                      onClick: handleSelection.bind(null, option),
                      option,
                      selected: isSelected,
                    };

                    return (
                        <>
                          { SelectOption(d) }
                        </>
                    );
                  })
                }
              </div>
            </div>
        ) }
      </Section>
  )
}
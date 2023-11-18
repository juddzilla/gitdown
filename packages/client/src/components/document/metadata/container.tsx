import { useEffect, useState } from 'react';
import SelectOption from './select-option';
import Icons from '../../Icons';
import Heading from './Heading';
import Section from './Section';

export default (props) => {
  const {
    allowCreate,
    display,
    multi,
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

  function createSelection(choice) {
    if (multi) {
      const choices = [...selected];
      const index = choices.indexOf(choice);

      if (index === -1) {
        choices.push(choice);
      } else {
        setSelected({ [property]: choices });
        choices.splice(index, 1);
      }
      setSelected({ [property]: choices });
    } else {
      const selection = choice === selected ? '' : choice;
      setSelected({ [property]: selection });
    }
  }

  function handleSelection(choice) {
    createSelection(choice);
    reset();
  }

  function createNew() {
    const newOpts = [...options, search].sort();
    setData(newOpts);
    createSelection(search);
  }

  const Selected = ({ value }) => (
      <div className='flex items-center rounded bg-white mr-2 mb-2'>
        <span className='p-2 pr-0'>
          { value }
        </span>
        <span className='cursor-pointer' onClick={handleSelection.bind(null, value)}>
          { Icons('x', ['stroke-black', 'scale-50']) }
        </span>
      </div>
  );

  function toggleActive() {
    setActive(!active);
    setSearch('');
    setData([...data]);
  }

  return (
      <Section>
        { Heading({ active, noToggle: false, title, toggleActive }) }
        { !active ? (
            <div className='flex flex-wrap'>
              {  (selected && selected.length) ? (
                  <>
                    { Array.isArray(selected) ? (
                        selected.map((selection, index) => (
                            <span key={index}>
                              <Selected value={selection} />
                            </span>))
                      ) : (
                        <Selected value={selected} />
                      )
                    }
                  </>
              ) : (
                <span>
                  No Selection
                </span>
              ) }
            </div>
        ) : (
            <div>
              <div className='border-b-4 border-black'>
                <input
                    className='outline-none p-2 w-full'
                    onChange={ handleInput }
                    placeholder='Search'
                    value={ search }
                />
              </div>
              { (allowCreate && !!!data.length) &&
                <div
                    className='mt-1 p-2 font-bold bg-black text-white cursor-pointer'
                    onClick={ createNew }
                >
                  Create { search } { display }
                </div>
              }
              { (!allowCreate && !!!data.length) &&
                  <div
                      className='mt-1 p-2 font-bold bg-black text-white'
                  >
                    No { display }: { search }
                  </div>
              }
              <div className='overflow-scroll max-h-64 w-full'>
                {
                  data.map((option, index) => {
                    const isSelected = multi ?
                      selected.includes(option) :
                      selected === option;
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
import Icons from "../../Icons";

export default ({ active, noToggle, title, toggleActive }) => {
  const activeClassList = [
    'duration-300',
    'ease-linear',
    'scale-75',
  ];

  if (noToggle) {
    activeClassList.push('hidden');
  } else if (active) {
    activeClassList.push('rotate-180');
  }

  return (
      <div className='mb-1 flex items-center justify-between cursor-pointer' onClick={ toggleActive }>
        <span className='text-xs font-bold uppercase'>
          { title }
        </span>
        <div className={ activeClassList.join(' ') }>
          { Icons('arrowDown', 'stroke-black') }
        </div>
      </div>
  );
};

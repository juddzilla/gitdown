import Icons from "../../Icons";

export default ({ active, noToggle, title, toggleActive }) => {
  const activeClassList = [
    'duration-300',
    'ease-linear',
    'scale-75',
    'absolute',
    'right-0',
  ];

  const parentClassList = [
    'relative',
    'flex',
    'items-center',
    'justify-center',
    'w-full',
  ];

  if (noToggle) {
    activeClassList.push('hidden');
  } else {
    parentClassList.push('cursor-pointer');
    if (active) {
      activeClassList.push('rotate-180');
    }
  }

  return (
      <div className='bg-slate-50 border-b-0 rounded flex items-center justify-between h-9'>
        <div className={ parentClassList.join(' ') } onClick={ toggleActive }>
          <span className='text-xs uppercase'>
            { title }
          </span>
          <div className={ activeClassList.join(' ') }>
            { Icons('arrowDown', ['stroke-black', 'scale-75']) }
          </div>
        </div>
      </div>
  );
};

import Icons from "../../Icons";

export default ({ active, noToggle, title, toggleActive }) => {
  const activeClassList = [
    'duration-300',
    'ease-linear',
    'scale-75',
    'right-0',
  ];

  const parentClassList = [
    'relative',
    'px-2',
    'w-full',
    'flex',
    'items-center',
    'justify-between',
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
      <div className=' h-9'>
        <div className={ parentClassList.join(' ') } onClick={ toggleActive }>
          <h2 className="text-sm font-semibold leading-6 text-gray-900">{ title }</h2>
          <div className={ activeClassList.join(' ') }>
            { Icons('arrowDown', ['stroke-black', 'scale-75']) }
          </div>
        </div>
      </div>
  );
};

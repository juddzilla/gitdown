export default (data) => {
  const {
    index,
    onClick,
    option,
    selected,
  } = data;

  const classList = [
    'border-l-2',
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
    classList.push('font-bold', 'border-black')
  } else {
    classList.push('border-transparent');
  }
  return (
      <div
          className={ classList.join(' ') }
          key={ index }
          onClick={ onClick }
      >
        { option }
      </div>
  );
}
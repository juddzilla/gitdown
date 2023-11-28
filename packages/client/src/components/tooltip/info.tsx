export default (props) => {
  const tooltipClassList = [
    'absolute',
    'opacity-0',
    'bottom-full',
    'p-2',
    'max-w-64',
    'bg-black',
    'text-white',
    'tooltip-info',
    'text-sm',
    'rounded-lg',
    'mb-1'
  ];

  // if (hovered) {
  //   tooltipClassList.push('opacity-100', 'z-100');
  // } else {
  //   tooltipClassList.push('pointer-events-none');
  // }
  return (
      <span className={ tooltipClassList.join(' ') }>{ props.children }</span>
  )
}
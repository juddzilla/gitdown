export default (props) => {
  const classList = [
    'tooltip-display',
    'flex',
    'items-center',
    'border',
    'border-neutral-100',
    'hover:border-neutral-300',
    'rounded-lg'
  ];

  return (
      <div className={ classList.join(' ') }>{ props.children }</div>
  )
}
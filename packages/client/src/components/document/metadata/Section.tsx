export const Heading = (title) => (

);

export default (props) => (
    <div className='hover:shadow-lg text-slate-400 hover:text-slate-900 w-64 mb-6 relative'>
      { props.children }
    </div>
);
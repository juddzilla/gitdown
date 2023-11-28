import { Link } from 'react-router-dom';
import Icons from '../../components/Icons';
import Tooltip from '../../components/tooltip/';

export default ({ data }) => {
  const classList = [
    'bg-white',
    'border',
    'border-transparent',
    'mb-6',
    'p-2',
    'rounded',
    'shadow-md',
    'hover:shadow-2xl',
    'hover:border-slate-200',
  ];

  const priorityCLassList = [
    'border-2',
    'border-black',
    'flex',
    'items-center',
    'justify-center',
    'rounded-lg',
    'w-12',
  ];


  switch (data.priority) {
    case 1:
      priorityCLassList.push('bg-black', 'text-white');
      break;
    case 2:
      priorityCLassList.push('font-bold');
      break;
    case 3:
      priorityCLassList.push('border-slate-200', 'font-bold');
      break;
    default:
      priorityCLassList.push('border-slate-200', 'text-slate-400');
  }

  return (
      <div className={ classList.join(' ') }>
        <Link className='no-underline' to={`/documents/${data.id}`}>
          <div className='flex items-center mb-1'>
            <div className={`w-12 h-12 flex justify-center items-center mr-2 rounded bg-${data.type.replace(' ', '-').toLowerCase()}-primary text-white`}>{ data.type[0] }</div>
            <div className='w-64'>
              <div className='text-xs' >{ data.project || '(no project)'}</div>
              <div className='font-bold truncate'>sdfsdf sdf sdf sdfsdfsf sdfsfs fsf sf sfd</div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <span className={ priorityCLassList.join(' ') }>{ data.priority }</span>
              <span className='text-right px-2'>{ data.status }</span>
            </div>
            <div className='flex items-center'>
              { data.users.length &&
                  <div className='flex items-center mr-3'>
                    <Tooltip.Container>
                      <Tooltip.Display>
                        <span className='pl-2 text-xs'>{ data.users.length } </span>
                        { Icons('users', ['stroke-black', 'ml-1', 'scale-75']) }
                      </Tooltip.Display>
                      <Tooltip.Info>
                        {
                          data.users.map(user => (<div key={ user }>{ user }</div>))
                        }
                      </Tooltip.Info>
                    </Tooltip.Container>
                  </div>
              }
              { data.tags.length &&
                  <div className='flex items-center'>
                    <Tooltip.Container>
                      <Tooltip.Display>
                        <span className='pl-2 text-xs'>{ data.tags.length } </span>
                        { Icons('tag', ['stroke-black', 'ml-1', 'scale-75']) }
                      </Tooltip.Display>
                      <Tooltip.Info>
                        {
                          data.tags.map(tag => (<div key={ tag }>{ tag }</div>))
                        }
                      </Tooltip.Info>
                    </Tooltip.Container>

                  </div>
              }
            </div>
          </div>
        </Link>
      </div>
  );
}
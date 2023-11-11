import { Link } from 'react-router-dom';
export default (data) => {
  return (
      <div className='flex'>
        { data.map((group, index) => (
          <div className='w-72 mr-4 border border-solid border-black p-2 bg-slate-50' key={index}>
            <div className=''>
              { group.name }
            </div>

            <div className=''>
              { group.results.map((res, i) => (
                  <div className='mb-4 border border-solid border-black' key={i}>
                    <Link className='no-underline' to={`/documents/${res.id}`}>
                      <div className='p-2' >{ res.project }</div>
                      <div>{ res.title || '--' }</div>
                      <div>{ res.id }</div>
                      <div>{ res.status }</div>
                      <div>{ res.type }</div>
                    </Link>
                  </div>

              )) }
            </div>

          </div>
        ))}
      </div>
  )
}
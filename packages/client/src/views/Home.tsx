const Component = () => {
  return (
      <>
        <div>
          <h1>Home</h1>
          <div>
            <ul>
              <li>Open Tasks</li>
            </ul>
          </div>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  path: "/",
};

export default Route;
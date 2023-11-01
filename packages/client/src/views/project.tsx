const Component = () => {
  return (
      <>
        <div>
          <h1>Project Id</h1>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  path: "/projects/:id",
};

export default Route;
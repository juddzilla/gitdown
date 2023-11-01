const Component = () => {
  return (
      <>
        <div>
          <h1>User</h1>
        </div>
      </>
  )
};

const Route = {
  element: <Component />,
  path: "/user/:id",
};

export default Route;
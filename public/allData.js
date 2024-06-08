

function AllData() {
  const { useEffect } = React;
  const [data, setData] = React.useState("");
  const [loaded, setLoaded] = React.useState(false);
  const [status, setStatus] = React.useState("");

  // var users;

  useEffect(() => {
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData({ users: data });
      });
  }, []);

  function handleLoad() {
    setLoaded(true);
    if (!loaded) {
      // change settimeout for async function
      setStatus(
        <span class="alert alert-danger d-flex align-items-center">
          {" "}
          Oh my guacamole! Something's not quite right..
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
    }

    setLoaded(true);
  }

  return (
    <>
      <h1> AllData</h1>
      <ButtonPersonalized
        titleButton="Retrieve data"
        handleOnclick={handleLoad}
      />
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Balance</th>
            </tr>
          </thead>
          <tbody>
            {loaded &&
              data.users.map((user, i) => (
                <tr>
                  <th scope="row" key={user.i}>{i}</th>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>{user.balance}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

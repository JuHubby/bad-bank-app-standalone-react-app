function Login() {
  const { useEffect } = React;
  const [data, setData] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [balance, setBalance] = React.useState(0);
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const { user } = React.useContext(UserContext);
  const { login } = React.useContext(UserContext);
  const ctx = React.useContext(UserContext);

  function validate(field, label) {
    if (!field) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> Holy guacamole! </strong>
          You should check in on {label} field above.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }
  function handleLogIn(e) {
    e.preventDefault();
    console.log(user.auth);
    console.log(email, password);
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;

    const url = `/account/login/${email}/${password}`;

    const getUser = async () => {
      try {
        const response = await fetch(url);
        if (response.status != 200) {
          throw new Error(
            `something went wrong, status code: ${response.status}`
          );
        }
        const userData = await response.json();
        return userData;
      } catch (err) {
        console.log(err);
      }
    };

    (async () => {
      const userData = await getUser();
      if (userData) {
        console.log("data updated:" + JSON.stringify(userData));
        var name = userData.name; //it helps with the delay of usestate
        var balance = userData.balance;
        setStatus("");
        setEmail(() => userData.email);
        setPassword(() => userData.password);
        setBalance(() => userData.balance);
        setName(() => userData.name);
        login(name, email, password, balance );
        clearForm();

        return; //important
      }

      setStatus(
        <>
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <p>
              {" "}
              Login failed: User or password not recognized. Please retry or
              register for a new account if you're not already part of our
              awesome Bank.
            </p>
          </span>
        </>
      );
      setTimeout(() => setStatus(""), 3000);
    })();
  }

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <h1>login {JSON.stringify(ctx)}</h1>
      {user.auth ? (
        <CardPersonalized
          wide="100"
          header="Log into your Account"
          nameButton="Save"
          hdColor="dark"
          status={status}
          textcenter="true"
          body={<LogInAuth name={name} balance={balance} />}
        />
      ) : (
        <CardPersonalized
          wide="30"
          header="Log into your Account"
          nameButton="Save"
          hdColor="dark"
          status={status}
          textcenter="true"
          body={
            <>
              <FormPersonalized
                valueEmail={email}
                valuePassword={password}
                handleOnChangeEmail={(e) => setEmail(e.currentTarget.value)}
                handleOnChangePassword={(e) =>
                  setPassword(e.currentTarget.value)
                }
              />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <ButtonPersonalized
                      titleButton="LogIn"
                      handleOnclick={handleLogIn}
                    />
                    <br />
                    <div className="col">
                      <LinkPersonalized
                        titleButton="Forgot your password?"
                        handleOnclick="#/login/"
                      />
                    </div>
                    <div className="col">
                      <LinkPersonalized
                        titleButton="Sig In"
                        handleOnclick="#/CreateAccount/"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          }
        />
      )}
    </>
  );
}

function LogInAuth(props) {
  const { user, logout } = React.useContext(UserContext);
  console.log(user.auth);
  console.log(user.name);


  return (
    <>
      <h1>Hello {user.name}!</h1>
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <h5>Balance</h5>
          </div>
          <div className="col">
            <h5>{"$ " + user.balance}</h5>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ButtonPersonalized
            titleButton="Logout"
            handleOnclick={() => logout()}
          />

          <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <DepositAuth />
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title"></h5>
                  <WithdrawAuth/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

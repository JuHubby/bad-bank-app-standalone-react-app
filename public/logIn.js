function Login() {
  const { useEffect } = React;
  const [data, setData] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [balance, setBalance] = React.useState(100);
  const [name, setName] = React.useState("");


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

  function handleLogIn() {
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
        const user = await response.json();
        return user;
      } catch (err) {
        console.log(err);
      }
    };

    (async () => {
      const user = await getUser();
      if (user) {
        console.log("data updated:" + JSON.stringify(user));
        setStatus("");
        setShow(false);
        setBalance(user.balance);
        setName(user.name);
        clearForm();
        return;
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
      <h1>login</h1>
      <CardPersonalized
        header="Log into your Account"
        nameButton="Save"
        hdColor="dark"
        textCenter="true"
        status={status}
        body={
          show ? (
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
          ) : (
            <>
              <h1>Hello {name}!</h1>
              <p>Your current balance is:</p>
              <br />
              <h3>${balance}</h3>
              <br />
              <div className="row">
                <div className="col">
                  <LinkPersonalized titleButton="Sign out" handleOnclick="#/" />
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
}

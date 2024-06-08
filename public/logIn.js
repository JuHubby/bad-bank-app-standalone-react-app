function Login() {
  const [data, setData] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [show, setShow] = React.useState(true);
  const { useEffect } = React;

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
    //validacion si idELement exists in te object array, however idElement is from other componet
    // if(ctx.users.includes(idElement) )return true;
    return true;
  }

  function handleLogIn() {
    console.log(email, password);
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;

    const url = `/account/logIn/${email}`;
    (async () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setData({ user: data });
        });
    })();

    console.log("data:" + data);
    if (data.user.password != password) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> Holy guacamole! </strong>
          Either your email or password are not correct!
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }

    setShow(false);
    clearForm();
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setShow(true);
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
                    <br/>
                    <div className="col">
                      <LinkPersonalized
                        titleButton="Forgot your password?"
                        handleOnclick="#/login/"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Your current balance is:</p>
              <br />
              {/* I want to link this to balance context or prop variable */}
              <h5>$2500</h5>
              <br />
              <div className="row">
                <div className="col">
                  <LinkPersonalized titleButton="Sign out" handleOnclick="#" />
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
}

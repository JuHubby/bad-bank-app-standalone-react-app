function Login() {
  const [status, setStatus] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [show, setShow] = React.useState(true);

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
    // (async () => {
    //   fetch(url)
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       setData({ user: data });
    //     });
    // })();

    // console.log("data:" + data);
    // if (data.user.password != password) {
    //   setStatus(
    //     <span className="alert alert-danger d-flex align-items-center">
    //       {" "}
    //       <strong> Holy guacamole! </strong>
    //       Either your email or password are not correct!
    //     </span>
    //   );
    //   setTimeout(() => setStatus(""), 3000);
    //   return false;
    // }

    // setShow(false);
    // clearForm();

    const onClicks = () => {
      fetch(url)
        .then((res) => {
          if (res.ok) {
            console.log(res);
            console.log("SUCCESS");
            return res.json(); // Parse the response body as JSON
          } else {
            console.log("Not Successful");
          }
        })
        .then((data) => {
          
          if (data) {
            console.log("ERROR1");
            console.log(data); // Now you have access to the data
            setStatus("");
            setShow(false);
            clearForm(); 
          } else {
            console.log("ERROR1b");
            console.log("Undefined data");
          }
        })
        .catch((error) => {
          console.log("ERROR2");
          setStatus(
            <>
              <span className="alert alert-danger d-flex align-items-center">
                {" "}
                <p>
                  {" "}
                  Login failed: User or password not recognized. Please retry or register for a new account if you're not already part of our awesome Bank.
                </p>
              </span>
            </>
          );
          setTimeout(() => setStatus(""), 3000);
        });
    };

    onClicks();
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

function CreateAccount() {
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(true);

  return (
    <CardPersonalized
      wide="50"
      textcenter="true"
      center="true"
      header=" Account Creation "
      nameButton="Save"
      hdColor="info"
      status={status}
      body={
        show ? (
          <CreateForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <CreateMsg setShow={setShow} />
        )
      }
    />
  );
}

function CreateForm(props) {
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [balance, setBalance] = React.useState(100);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [found, setFound] = React.useState(false);
  const [data, setData] = React.useState("");

  function validate(field, label) {
    if (!name) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> All fields are required</strong>
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }

    if (!password) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> All fields are required</strong>
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        password
      )
    ) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong>
            {" "}
            The password must contain minimum 8 Characters, One Uppercase, One
            Lowercase, One Number and One Special Case Character
          </strong>
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    }
    if (!email) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> All fields are required</strong>
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);
      return false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          <strong> Type a valid email address</strong>
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);

      return false;
    }

    return true;
  }

  function handleCreate() {
    if (!validate(name, "Name")) return;
    if (!validate(lastName, "Last name")) return;
    if (!validate(email, "Email")) return;
    if (!validate(password, "Password")) return;

    const url = `/account/create/${name}/${lastName}/${email}/${password}`;

    const getUsers = async () => {
      try {
        const response = await fetch(url);
        if (response.status != 200) {
          throw new Error(
            `something went wrong, status code: ${response.status}`
          );
        }
        const users = await response.json();
        return users;
      } catch (err) {
        console.log(err);
      }
    };

    (async () => {
      const users = await getUsers();
      if (users) {
        console.log("data updated:" + JSON.stringify(users)); // Now you have access to the data
        props.setStatus("");
        props.setShow(false);
        clearForm();
        return;
      }
      props.setStatus(
        <>
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <p>
              {" "}
              The email address is already in use. Please try another one, or
              log in to your existing account associated with that email.
            </p>
          </span>
        </>
      );
      setTimeout(() => props.setStatus(""), 3000);
    })();
  }

  function clearForm() {
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <p>
        Please register your account and remember to submit the necessary
        information for saving.
      </p>
      <br />
      Name <br />
      <input
        type="input"
        className="form-control"
        id="name"
        placeholder="Enter name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
        }}
      ></input>
      <br />
      Last Name <br />
      <input
        type="input"
        className="form-control"
        id="lastname"
        placeholder="Enter lastname"
        value={lastName}
        onChange={(e) => {
          setLastName(e.currentTarget.value);
        }}
      ></input>
      <FormPersonalized
        valueEmail={email}
        valuePassword={password}
        handleOnChangeEmail={(e) => {
          setEmail(e.currentTarget.value);
        }}
        handleOnChangePassword={(e) => {
          setPassword(e.currentTarget.value);
        }}
      />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <ButtonPersonalized
              titleButton="Create Account"
              handleOnclick={() => handleCreate()}
            />
            <br />
            <div className="col">
              <LinkPersonalized
                titleButton=" or Log In?"
                handleOnclick="#/login/"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function CreateMsg(props) {
  return (
    <>
      <>
        <h5 className="alert alert-success">
          <p className="text-center">successfully completed.</p>
        </h5>
        <br />
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <LinkPersonalizedButtonLook
                titleButton="LogIn"
                handleOnclick="#/login/"
              />
            </div>
          </div>
        </div>
        <br />
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <ButtonPersonalized
                titleButton="Create Another Account"
                handleOnclick={() => props.setShow(true)}
              />
            </div>
          </div>
        </div>
      </>
    </>
  );
}

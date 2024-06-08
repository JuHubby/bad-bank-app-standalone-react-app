function CreateAccount() {
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(true);
  const [fault, setFault] = React.useState(false);

  return (
    <CardPersonalized
      wide="50"
      header="Create your Account"
      nameButton="Save"
      hdColor="info"
      center="true"
      status={status}
      body={
        show ? 
         ( <CreateForm
            setFault={setFault}
            setShow={setShow}
            setStatus={setStatus}
          />)
         : 
       ( fault ? 
          <CreateMsgError setShow={setShow} /> :
          <CreateMsg setFault={setFault} setShow={setShow} setStatus={setStatus} />)
         }
        />
      )};

function CreateForm(props) {
  const { useEffect } = React;
  const [lastName, setLastName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [balance, setBalance] = React.useState(100);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
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
    } 
    // else if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
    //     password
    //   )
    // ) {
    //   props.setStatus(
    //     <span className="alert alert-danger d-flex align-items-center">
    //       {" "}
    //       <strong>
    //         {" "}
    //         The password must contain minimum 8 Characters, One Uppercase, One
    //         Lowercase, One Number and One Special Case Character
    //       </strong>
    //     </span>
    //   );
    //   setTimeout(() => props.setStatus(""), 3000);
    //   return false;
    // }
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
    async function dataUrl() {
      var res = await fetch(url);
      var data = await res.json();
      console.log(data);
      setData(data);
    }
    dataUrl();

    if (data.length > 0) {
      console.log("User already in exists");
      props.setStatus("Error");
      props.setShow(true);
      props.setFault(true);
      
      
      
      
      
    } else {
      // else create user
      setName(data.name);
      setLastName(data.lastname);
      setEmail(data.email);
      setPassword(data.password);
     
      
      
      
    }

    console.log(name, email, lastName, password, balance);

    props.setShow(false);
    props.setFault(false);
    clearForm();
    // return false;
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
        onChange={(e) => setName(e.currentTarget.value)}
      ></input>
      <br />
      Last Name <br />
      <input
        type="input"
        className="form-control"
        id="lastname"
        placeholder="Enter lastname"
        value={lastName}
        onChange={(e) => setLastName(e.currentTarget.value)}
      ></input>
      <FormPersonalized
        valueEmail={email}
        valuePassword={password}
        handleOnChangeEmail={(e) => setEmail(e.currentTarget.value)}
        handleOnChangePassword={(e) => setPassword(e.currentTarget.value)}
      />
      <div className="container text-center">
        <div className="row">
          <div className="col">
            <ButtonPersonalized
              titleButton="Create Account"
              handleOnclick={() => {
                handleCreate();
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function CreateMsg(props) {
  return (
    <>
       
        <> <h5 className="alert alert-success">
          You have successfully created your account.
        </h5>
        <div className="row">
        <div className="col">
          <ButtonPersonalized
            titleButton="Create Another Account"
            handleOnclick={() => props.setShow(true)}
          />
        </div>
      </div>
      </>
      
      
    </>
  );
}

function CreateMsgError(props) {
  return (
    <>
      <h5 className="alert alert-danger">User already in exists.</h5>
      <div className="row">
        <div className="col">
          <ButtonPersonalized
            titleButton="Try with an alternative email"
            handleOnclick={() => props.setShow(true)}
          />
          <p className="text-center">
            Consider trying a different email address, or alternatively, log in or reset password .
          </p>
          <LinkPersonalized />
          <LinkPersonalized />
        </div>
      </div>
    </>
  );
}

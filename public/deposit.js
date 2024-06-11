function Deposit() {
  const { user } = React.useContext(UserContext);
  const ctx = React.useContext(UserContext);

  return (
    <>
      <p>Context share {JSON.stringify(ctx)}</p>

      {user.auth ? (
        <DepositAuth />
      ) : (
        <>
          <div className="container ">
            <div className="row">
              <div className="col text-center">
                <div className="card">
                  <div className="card-header">Please, Log in!</div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <div className="card">
                        <div className="card-body">
                          To deposit funds, you must first log in to your
                          account. If you're not part of the crew yet, create
                          your own account and join us!
                        </div>
                        <LinkPersonalizedButtonLook
                          titleButton="LogIn"
                          handleOnclick="#/login/"
                        />
                        <br />
                      </div>
                    </li>
                    <li className="list-group-item">
                      <LinkPersonalized
                        titleButton="or Sig In!"
                        handleOnclick="#/CreateAccount/"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function DepositAuth() {
  const [status, setStatus] = React.useState("");
  const { user, setUser } = React.useContext(UserContext);
  const [email, setEmail] = React.useState("");
  const { login } = React.useContext(UserContext);
  const [display, setDisplay] = React.useState(true);
  const [balance, setBalance] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState(0);
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState();

  function validate(field, label) {
    if (!field) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Holy guacamole! You should select or type an amount on the {
            label
          }{" "}
          field above.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);

      return false;
    }
    if (field <= 0) {
      setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Ups! You're not able to deposit a negative amount. Please choose a
          positive number.
        </span>
      );
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  function handleDeposit() {
    if (!validate(depositAmount, "Deposit Amount")) return;
    // i will think that setbalance is going to be setvariable after addign setdeposit and then push to usercontext object somehow//
    // const balance = balancebefore + depositAmount;
    const totalBalanceSofar = parseInt(depositAmount) + parseInt(balance);
    setBalance(totalBalanceSofar);

    var email = user.email;
    var amount = depositAmount;
    const url = `/account/update/${email}/${amount}`;

    const getUserUpdated = async () => {
      try {
        const response = await fetch(url);
        if (response.status != 200) {
          throw new Error(
            `something went wrong, status code: ${response.status}`
          );
        }
        const userInfo = await response.json();
        return userInfo;
      } catch (err) {
        console.log(err);
      }
    };

    (async () => {
      const userInfo = await getUserUpdated();
      if (userInfo) {
        console.log("data updated:" + JSON.stringify(userInfo)); // Now you have access to the data
        var name = userInfo.value.name; //it helps with the delay of usestate
        var balance = userInfo.value.balance;
        setEmail(() => userInfo.value.email);
        setPassword(() => userInfo.value.password);
        setBalance(() => userInfo.value.balance);
        setName(() => userInfo.value.name);
        login(name, email, password, balance);
        setDisplay(false);
        setUser((prev) => ({ ...prev, balance: balance }));
        clearForm();
        return;
      }
      setStatus(
        <>
          <span className="alert alert-danger d-flex align-items-center">
            {" "}
            <p> Error </p>
          </span>
        </>
      );
      setTimeout(() => setStatus(""), 3000);
    })();
  }

  function clearForm() {
    setDepositAmount("");
    setDisplay(true);
  }

  return (
    <>
      <h1>Hello {user.name}!</h1>
      <CardPersonalized
        header=" Deposit "
        text=""
        nameButton="Save"
        center="true"
        status={status}
        body={
          display ? (
            <>
              {" "}
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
              Deposit Amount: <br />
              <input
                type="number"
                className="form-control"
                id="depositAmount"
                placeholder="Enter Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.currentTarget.value)}
              ></input>{" "}
              <br />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <ButtonPersonalized
                      titleButton="Deposit"
                      handleOnclick={handleDeposit}
                    />
                  </div>
                </div>
              </div>{" "}
            </>
          ) : (
            <>
              {/* add emoji happy */}
              {/* <i className="bi bi-emoji-smile"></i> */}
              <h5 className="alert alert-success text-center">
                The deposit was successful.
              </h5>
              <br />
              <div className="container text-center">
                <div className="row">
                  <div className="col">
                    <h5>Your new balance is:</h5>
                  </div>
                  <div className="col">
                    <h5>{"$ " + user.balance}</h5>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col">
                  <ButtonPersonalized
                    titleButton="Make a new deposit."
                    handleOnclick={clearForm}
                  />
                </div>
              </div>
            </>
          )
        }
      />
    </>
  );
}

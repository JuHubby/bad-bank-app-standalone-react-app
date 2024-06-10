function Deposit() {
  const [status, setStatus] = React.useState("");
  const [show, setShow] = React.useState(true);
  const { login } = React.useContext(UserContext);
  const [name, setName] = React.useState();
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const ctx = React.useContext(UserContext);

  return (
    <>
      <h2>Deposit {JSON.stringify(ctx)}</h2>
      <CardPersonalized
        wide="50"
        header=" Please, Log in! "
        text="To deposit funds, you must first log in to your account."
        nameButton="Save"
        center="true"
        status={status}
        body={
          show ? (
            <>
              <h1>Please, Log in! </h1>
              <p>To deposit funds, you must first log in to your account.</p>
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
                  <br />
                  <p>
                    If you're not part of the crew yet, create your own account
                    and join us!
                  </p>
                  <div className="col">
                    <LinkPersonalized
                      titleButton="Sig In"
                      handleOnclick="#/CreateAccount/"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <DepositAuth setShow={setShow} name={name} setStatus={setStatus} />
          )
        }
      />
    </>
  );
}

function DepositAuth() {
  const { user, logout } = React.useContext(UserContext);
  const { display, setDisplay } = React.useState(true);
  const [balance, setBalance] = React.useState(0);
  const [depositAmount, setDepositAmount] = React.useState("");

  function validate(field, label, props) {
    if (!field) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Holy guacamole! You should select or type an ammount on the {
            label
          }{" "}
          field above.
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);

      return false;
    }
    if (field <= 0) {
      props.setStatus(
        <span className="alert alert-danger d-flex align-items-center">
          {" "}
          Ups! You're not able to deposit a negative amount. Please choose a
          positive number.
        </span>
      );
      setTimeout(() => props.setStatus(""), 3000);
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

    const url = `/account/update/${email}/${amount}`;
  }

  function clearForm(props) {
    setDepositAmount("");
    props.setShow(true);
  }

  return (
    <>
      {" "}
      {display ? (
        <>
          {" "}
          <h1>Hello {user.name}!</h1>
          <p>Your current balance is:</p>
          <br />
          <h3>${balance}</h3>
          <br />
          <div className="container text-center">
            <div className="row">
              <div className="col">
                <h5>Balance</h5>
              </div>
              <div className="col">
                <h5>{"$ " + balance}</h5>
              </div>
            </div>
          </div>
          Deposit Amount <br />
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
                <h5>{"$ " + balance}</h5>
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
      )}
    </>
  );
}
